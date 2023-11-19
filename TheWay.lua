log.write("THEWAY", log.INFO, "Initializing...")
--Version 3
local tcpServer                        = nil
local udpSpeaker                       = nil
package.path                           = package.path .. ";" .. lfs.currentdir() .. "/LuaSocket/?.lua"
package.cpath                          = package.cpath .. ";" .. lfs.currentdir() .. "/LuaSocket/?.dll"
package.path                           = package.path .. ";" .. lfs.currentdir() .. "/Scripts/?.lua"
local socket                           = require("socket")
local JSON                             = loadfile("Scripts\\JSON.lua")()

local upstreamLuaExportStart           = LuaExportStart
local upstreamLuaExportAfterNextFrame  = LuaExportAfterNextFrame
local upstreamLuaExportBeforeNextFrame = LuaExportBeforeNextFrame



function LuaExportStart()
    if upstreamLuaExportStart ~= nil then
        successful, err = pcall(upstreamLuaExportStart)
        if not successful then
            log.write("THEWAY", log.ERROR, "Error in upstream LuaExportStart function" .. tostring(err))
        end
    end

    udpSpeaker = socket.udp()
    udpSpeaker:settimeout(0)
    tcpServer = socket.tcp()
    tcpServer:bind("127.0.0.1", 42070)
    tcpServer:listen(1)
    tcpServer:settimeout(0)
end

local data
local busy = false;
local isPressed = false
local currCommandIndex = 1
local lastDevice = ""
local lastCode = ""
local lastNeedDepress = true
local whenToDepress = nil
function LuaExportBeforeNextFrame()
    if upstreamLuaExportBeforeNextFrame ~= nil then
        successful, err = pcall(upstreamLuaExportBeforeNextFrame)
        if not successful then
            log.write("THEWAY", log.ERROR, "Error in upstream LuaExportBeforeNextFrame function" .. tostring(err))
        end
    end

    if busy then
        if isPressed then
            -- check if the time has come to depress
            local currTime = socket.gettime()
            if currTime >= whenToDepress then
                -- check if it even needs a depress
                if lastNeedDepress then
                    GetDevice(lastDevice):performClickableAction(lastCode, 0)
                end
                isPressed = false
                currCommandIndex = currCommandIndex + 1
            end
        else
            -- Prepare for new button push
            local keys = JSON:decode(data)
            --check if there are buttons left to press
            if currCommandIndex <= #keys then
                lastDevice = keys[currCommandIndex]["device"]
                lastCode = keys[currCommandIndex]["code"]
                local stringtoboolean = { ["true"] = true,["false"] = false }
                lastNeedDepress = stringtoboolean[keys[currCommandIndex]["addDepress"]]
                local delay = tonumber(keys[currCommandIndex]["delay"])
                local activate = tonumber(keys[currCommandIndex]["activate"])
                -- Push the button
                GetDevice(lastDevice):performClickableAction(lastCode, activate)
                --Store the time when we will need to depress
                whenToDepress = socket.gettime() + (delay / 1000)
                isPressed = true
            else
                --if there's nothing else to press, we are done
                busy = false
                currCommandIndex = 1
            end
        end
    else
        local client, err = tcpServer:accept()
        if client ~= nil then
            client:settimeout(10)
            data, err = client:receive()
            if err then
                log.write("THEWAY", log.ERROR, "Error at receiving: " .. err)
            end

            if data then
                busy = true
            end
        end
    end
end

function LuaExportAfterNextFrame()
    if upstreamLuaExportAfterNextFrame ~= nil then
        successful, err = pcall(upstreamLuaExportAfterNextFrame)
        if not successful then
            log.write("THEWAY", log.ERROR, "Error in upstream LuaExportAfterNextFrame function" .. tostring(err))
        end
    end


    local camPos = LoGetCameraPosition()
    local loX = camPos['p']['x']
    local loZ = camPos['p']['z']
    local elevation = LoGetAltitude(loX, loZ)
    local coords = LoLoCoordinatesToGeoCoordinates(loX, loZ)
    local selfData = LoGetSelfData()
    local model = selfData and selfData['Name'] or ''
    local message = {}
    message["model"] = model
    message["coords"] = {}
    message["coords"]["lat"] = tostring(coords.latitude)
    message["coords"]["long"] = tostring(coords.longitude)
    message["elev"] = tostring(elevation)
    local toSend = JSON:encode(message)

    if pcall(function()
            socket.try(udpSpeaker:sendto(toSend, "127.0.0.1", 42069))
        end) then
    else
        log.write("THEWAY", log.ERROR, "Unable to send data")
    end
end

log.write("THEWAY", log.INFO, "Done")
