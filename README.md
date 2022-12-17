# Reception Management dashboard app

## App description

This app has two main functionalities:

### 1.	Staff member out-of-office logging
App request and receiving a list of employees via API call. Received data creates staff objects and adds them them to a “Staff board”. 
When staff member wants to leave the building for a period of time during the working hours, app user (generally receptionist) can select the staff member and “clock out” the staff member, adding expected absence duration. If staff member is not returned or “clocked in” after expected absence duration is passed, app will show the toast with specific staff members photo, full name and expected duration time. 

### 2.	Deliveries tracking
App user (generally receptionist) can manually add new delivery driver with deliver information and expected return time. Adding new delivery will create the new object and add it to the delivery board. Up on drivers return, app user can clear the driver from delivery board, this will also delete the driver object from the system. 
If driver is not cleared from the delivery board by the given return time, app will show toast with the driver and delivery information. 


## Installation

Web Application folder can be downloaded on your local system and used with the modern web browser. 
Download the “Web Application” folder, open the index.html in your web browser, and you are good to go…

Here some list of web browsers this app has been tested on:
https://www.google.com/chrome/

https://www.microsoft.com/en-us/edge


## External library

Additionally to jquery and Bootstrap, app uses the external libraries for formatting purposes: 

### •	cleave.js 

Formats the delivery telephone and return time in input in delivery scheduler. 

More about this library: https://nosir.github.io/cleave.js/


### •	moment.js

Is responsible for all rest of the time and date formatting in this app. 

More about this library: https://momentjs.com/
Relevant JS code/packages from those libraries are in the “formatters” folder, so no need of downloading them. 
