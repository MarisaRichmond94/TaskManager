#! /bin/bash
# become root user
sudo su

# update dependencies
yum -y update

# install java
yum install java-11

# run the jar that should already be on the EC2 instance at this point
java -cp /home/ec2-user/server.jar com.marisarichmond.taskmanager.TaskManagerApplication
java -jar server.jar
