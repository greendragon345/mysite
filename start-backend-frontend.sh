#!/bin/bash
cd backend/ 
npm run dev 1>/dev/null 2>/dev/null & 
cd ../frontend
npm run dev 1>/dev/null 2>/dev/null &
