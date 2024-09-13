#!/bin/bash
#export HOST_IP=set_host_ip_in_container"
echo "REACT_APP_IP_ADDR=""$HOST_IP" > frontend/.env
echo -e "PORT=7000 \nIP_ADDR="$HOST_IP"" > backend/.env

