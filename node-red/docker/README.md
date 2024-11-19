Create the folder

sudo usermod -aG docker $USER
mkdir data
chmod a+w data

docker-compose up -d

