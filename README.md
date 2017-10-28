# Portofolio-Week1
My Portofolio Exercise on Hacktiv8

### List of Exercise :

Semantic Web

ToDo Fancy

### List of routes on Server (ToDo Fancy):

#### User

|routes                                         |HTTP         |Description                  |
|-----------------------------------------------|:-----------:|----------------------------:|
|<div style='color:cyan'>/users</div>           |** GET **    |Show All Users               |
|<div style='color:cyan'>/users/login</div>     |** POST **   |Login Authentication         |
|<div style='color:cyan'>/users/fblogin</div>   |** POST **   |Facebook Login Authentication|
|<div style='color:cyan'>/users/register</div>  |** POST **   |Add User                     |
|<div style='color:cyan'>/users/delete/:id</div>|** DELETE ** |Delte User based on ID       |

#### Todo

|routes                                         |HTTP         |Description                                        |
|-----------------------------------------------|:-----------:|--------------------------------------------------:|
|<div style='color:cyan'>/todos/:token</div>    |** GET **    |Show All Users based on Id                         |
|<div style='color:cyan'>/todos/insert</div>    |** POST **   |Add todo list                                      |
|<div style='color:cyan'>/todos/update/:id</div>|** PUT **    |Update todo list status from unfinished to finished|
|<div style='color:cyan'>/todos/delete/:id</div>|** DELETE ** |Delte todo list based on ID                        |

#### NB :
I'm using cron job for email notification, if deadline has been set and status not finish. Email should be sent 1 day before deadline on 06:00:00 in the morning
