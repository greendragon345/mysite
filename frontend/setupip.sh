#!/bin/bash
ip=$(ip -4 -o addr show enp3s0 | awk '{print $4}' | cut -d "/" -f 1)
echo "IP_ADDR=""$ip" > stream-website/.env
