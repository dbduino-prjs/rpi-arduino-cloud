

sudo apt install gpiod libgpiod2 libgpiod-dev libnode-dev
npm install --save node-libgpiod node-fetch

Make sure that all the variables are global (chip, ledLine, buttonLine, ...). Otherwise, any timed operation will not work properly.