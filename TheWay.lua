--Version 2
local tcpServer = nil
local udpSpeaker = nil
package.path  = package.path..";"..lfs.currentdir().."/LuaSocket/?.lua"
package.cpath = package.cpath..";"..lfs.currentdir().."/LuaSocket/?.dll"
package.path  = package.path..";"..lfs.currentdir().."/Scripts/?.lua"
local socket = require("socket")

local JSON = loadfile("Scripts\\JSON.lua")()
local needDelay = false
local keypressinprogress = false
local isPressed = false
local hadDelay = false
local frameCounter = 0
local data
local delay = 0
local code = ""
local device = ""
local addDepress = true
local nextIndex = 1

local model
local lastSend = ""

local upstreamLuaExportStart = LuaExportStart
local upstreamLuaExportAfterNextFrame = LuaExportAfterNextFrame
local upstreamLuaExportBeforeNextFrame = LuaExportBeforeNextFrame


function LuaExportStart()
    if upstreamLuaExportStart ~= nil then
        successful, err = pcall(upstreamLuaExportStart)
        if not successful then
            log.write("THEWAY", log.ERROR, "Error in upstream LuaExportStart function"..tostring(err))
        end
    end
    model = LoGetSelfData()["Name"];
	udpSpeaker = socket.udp()
	udpSpeaker:settimeout(0)
	tcpServer = socket.tcp()
    tcpServer:bind("127.0.0.1", 42070)
    tcpServer:listen(1)
    tcpServer:settimeout(0)
end

function LuaExportBeforeNextFrame()
    if upstreamLuaExportBeforeNextFrame ~= nil then
        successful, err = pcall(upstreamLuaExportBeforeNextFrame)
        if not successful then
           log.write("THEWAY", log.ERROR, "Error in upstream LuaExportBeforeNextFrame function"..tostring(err))
        end
    end

  if needDelay then
		if frameCounter < delay then
			frameCounter = frameCounter + 1
		else
			needDelay = false
			frameCounter = 0
			if addDepress then
				GetDevice(device):performClickableAction(code, 0)
			end
		end
	else
		if keypressinprogress then
			local keys = JSON:decode(data)
			for i=nextIndex, #keys do
				local keyObj = keys[i]
				device = keyObj["device"]
				code = keyObj["code"]
				local addDepressString = keyObj["addDepress"]
				local stringtoboolean={ ["true"]=true, ["false"]=false }
				addDepress = stringtoboolean[addDepressString]
				delay = tonumber(keyObj["delay"])
				
				local activate = tonumber(keyObj["activate"])

				if delay > 0 then
					needDelay = true
					GetDevice(device):performClickableAction(code, activate)
					nextIndex = i+1
					break
				else
					GetDevice(device):performClickableAction(code, activate)
					if addDepress then
						GetDevice(device):performClickableAction(code, 0)
					end
				end
			end
			if not needDelay then
				keypressinprogress = false
				nextIndex = 1
			end
		else
		    local client, err = tcpServer:accept()
						--spams too much
            -- if err ~= nil then
            --     log.write("THEWAY", log.ERROR, "Error at accepting connection: "..err)
            -- end
            if client ~= nil then
                client:settimeout(10)
			    data, err = client:receive()
			    if err then
				    log.write("THEWAY", log.ERROR, "Error at receiving: "..err)  
			    end

			    if data then 
				    keypressinprogress = true
			    end
            end
		end
	end
end

function LuaExportAfterNextFrame()
    if upstreamLuaExportAfterNextFrame ~= nil then
        successful, err = pcall(upstreamLuaExportAfterNextFrame)
        if not successful then
            log.write("THEWAY", log.ERROR, "Error in upstream LuaExportAfterNextFrame function"..tostring(err))
        end
    end


  local camPos = LoGetCameraPosition()
	local loX = camPos['p']['x']
	local loZ = camPos['p']['z']
	local elevation = LoGetAltitude(loX, loZ)
	local coords = LoLoCoordinatesToGeoCoordinates(loX, loZ)

	local toSend = "{ ".."\"model\": ".."\""..model.."\""..", ".."\"coords\": ".. "{ ".."\"lat\": ".."\""..coords.latitude.."\""..", ".."\"long\": ".."\""..coords.longitude.."\"".."} "..", ".."\"elev\": ".."\""..elevation.."\"".."}"
    if toSend ~= lastSend then 
		if pcall(function()
			socket.try(udpSpeaker:sendto(toSend, "127.0.0.1", 42069)) 
		end) then
			lastSend = toSend
		else
			log.write("THEWAY", log.ERROR, "Unable to send data")
		end
	end
end