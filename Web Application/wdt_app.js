class Employee {
  constructor(name, surename) {
    this.name = name
    this.surename = surename
   }
}
class StaffMember extends Employee {
  constructor(name, surename, photo, email){
    super(name, surename)
    this.photo = photo
    this.email = email
    this.status = "In"
    this.outtime = ""
    this.duration = ""
    this.expectedReturnTime = ""
    this.id = "staffID" + setTimeout(Date.now(), 1) // Set the unic ramndom ID
  }
}
class DeliverDriver extends Employee {
  constructor(name, surename, vehicle, telephone, deliveryAddress, returnTime, driverID){
    super(name, surename)
    this.vehicle = vehicle
    this.telephone = telephone
    this.deliveryAddress = deliveryAddress
    this.returnTime = returnTime
    this.driverID = driverID
  }
}



const staff = []
$(document).ready(async function staffUserGet(){
  const response = await fetch('https://randomuser.me/api/?results=5&inc=name,email,picture,id')
  staffData = await response.json()
  staffData = await staffData.results.map(staffMember =>
  new StaffMember(staffMember.name.first, staffMember.name.last, staffMember.picture.medium, staffMember.email))
  staff.push(...staffData)
  addStaff()
})



function addStaff(){
  staffTableData=""
  staff.map(staffMembers => {
    staffTableData +=
    `<tr id=${staffMembers.id} class="stafftablerow">
    <td id="photo"><img src="${staffMembers.photo}"></td>
    <td id="name">${staffMembers.name}</td>
    <td id="surename">${staffMembers.surename}</td>
    <td id="email">${staffMembers.email}</td>
    <td id="status">${staffMembers.status}</td>
    <td id="outtime"></td>
    <td id="duration"></td>
    <td id="expectedreturntime"></td>
    </tr>`
    document.getElementById("staffmembers").innerHTML = staffTableData //NOT WORKING WITH JQUERY FOR SOME REASON
  })
}



$("#clockout").click(function staffOut(){
  duration = parseInt(prompt("Please enter the duration of absence in minutes"))
  selectedStaffId = $(".selectedstaff").attr("id")
  selectedStaffinArray = staff.find(staffMember => staffMember.id == selectedStaffId)
  selectedStaffinArray.status = "Out"
  selectedStaffinArray.outtime = moment().format('HH:mm')
  selectedStaffinArray.duration = moment().startOf('day').add(duration, 'minutes').format('HH:mm')
  selectedStaffinArray.expectedReturnTime = moment().add(duration, 'minutes').format('HH:mm')

  selectedStaffInTable = $(".selectedstaff")
  selectedStaffInTable.find("#status").text(selectedStaffinArray.status)
  selectedStaffInTable.find("#outtime").text(selectedStaffinArray.outtime)
  selectedStaffInTable.find("#duration").text(selectedStaffinArray.duration)
  selectedStaffInTable.find("#expectedreturntime").text(selectedStaffinArray.expectedReturnTime)

  staffMemberIsLate(selectedStaffinArray)
})


function staffMemberIsLate(selectedStaffinArray){
  timeoutID = setTimeout(() => {
  toastContent =
  `<div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
  <img src="${selectedStaffinArray.photo}" class="rounded me-2" alt="...">
  <strong class="me-auto">${selectedStaffinArray.name} ${selectedStaffinArray.surename} <br> hase been away for <br> ${selectedStaffinArray.duration} minutes</strong>
  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  </div>`
  document.getElementById("toastConteiner").innerHTML = toastContent 
  $('.toast').toast('show')
  $(`tr[timeoutid="${timeoutID}"]`).removeAttr("timeoutid")

  }, duration*60000)
  $(".selectedstaff").attr("timeoutid", timeoutID)
}


$("#clockin").click(function stuffIn(){
  selectedStaffId = $(".selectedstaff").attr("id")
  selectedStaffinArray = staff.find(staffMember => staffMember.id == selectedStaffId)
  selectedStaffinArray.status = "In"
  selectedStaffinArray.outtime = ""
  selectedStaffinArray.duration = ""
  selectedStaffinArray.expectedReturnTime = ""

  selectedStaffInTable = $(".selectedstaff")
  selectedStaffInTable.find("#status").text(selectedStaffinArray.status)
  selectedStaffInTable.find("#outtime").text(selectedStaffinArray.outtime)
  selectedStaffInTable.find("#duration").text(selectedStaffinArray.duration)
  selectedStaffInTable.find("#expectedreturntime").text(selectedStaffinArray.expectedReturnTime)

  timeoutID = selectedStaffInTable.attr("timeoutid")
  $(`tr[timeoutid="${timeoutID}"]`).removeAttr("timeoutid")
  clearTimeout(timeoutID)
})



const drivers = []
$(document).ready(function(){
  $("#adddriver").click(function addDelivery(){
    newDriver = new DeliverDriver(
    driverName = $("#namedata").val(),
    driverSurename = $("#surenamedata").val(),
    vehicle = $("#vehicledata").val(),
    driverTelephone = $("#telephonedata").val(),
    driverAddress = $("#addressdata").val(),
    driverReturntime = $("#returntimedata").val(),
    driverID = "driverID" + setTimeout(Date.now(), 1))
    drivers.push(newDriver)
    
    switch(vehicle){
      case "Car": vehicle = String.raw`<img class="svg-icon" src="images\caricon.svg" alt="Car" />` 
      break;
      case "Motorcycle": vehicle = String.raw`<img class="svg-icon" src="images\motorcycleicon.svg" alt="Motorcycle" />`
      break;
    }

    driversTableData =
      `<tr id="${driverID}" class="deliverytablerow">
      <td class="drivervehicle">${vehicle}</td>
      <td class="drivername">${driverName}</td>
      <td class="driversurename">${driverSurename}</td>
      <td class="drivertelephone">${driverTelephone}</td>
      <td class="driveraddress">${driverAddress}</td>
      <td class="driverreturntime">${driverReturntime}</td>
      </tr>`

    $("#deliverydrivers").append(driversTableData)

    currentDriver = drivers.find(driver => driver.driverID == driverID)

    deliveryDriverIsLate(currentDriver)
    })
  })



function deliveryDriverIsLate(currentDriver){
  duration = moment(currentDriver.returnTime, 'HH:mm').diff(moment(), 'milliseconds')
  console.log(duration)
  timeoutID = setTimeout(() => {
  driverToastContent =
  `<div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
  <strong class="me-auto">
  ${currentDriver.name} ${currentDriver.surename}</strong>
  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">
  Should been back at ${currentDriver.returnTime}<br>
  from ${currentDriver.deliveryAddress}<br><br>
  Drivers phone number is ${currentDriver.telephone}
  </div>
  </div>`
  document.getElementById('toastConteiner').innerHTML = driverToastContent //NOT WORKING WITH JQUERY FOR SOME REASON
  $('.toast').toast('show')
  $(`tr[timeoutid="${timeoutID}"]`).removeAttr("timeoutid")
  }, duration)
  $(`tr[id="${currentDriver.driverID}"]`).attr("timeoutid", timeoutID)
}


$("#cleardriver").click(function cleareDelivery(){
  if (confirm("Are you sure you want to clear delivery?") == true){
    selectedDriverInTable = $(".selecteddriver").remove()
    clearTimeout(selectedDriverInTable.attr("timeoutid"))
    selectedDriverId = selectedDriverInTable.attr("id")
    drivers.splice(drivers.indexOf(drivers.find(driver => driver.driverID == selectedDriverId)), 1)
  }
})


$(".driverinput").on("input", function validateDelivery(){
  inputs = $(".driverinput")
  if( inputs[0].value == "Motorcycle" || inputs[0].value == "Car" &&
      inputs[1].value.length > 3 &&
      inputs[2].value.length > 3 &&
      inputs[3].value.length > 6 &&
      inputs[4].value != "" &&
      inputs[5].value.length > 4){
    $("#adddriver").removeClass("disabled")
  }else{
    $("#adddriver").addClass("disabled")
  }
})


$(document).ready(function digitalClock(){
  $("#clock").text(moment().format("DD MMMM YYYY, HH:mm:ss"))
  setTimeout(digitalClock, 1000)
})


//HELPER FUNCTIONS_______________________________________________________________

//Togeling the selected class on the table rows (same for staff and delivery drivers!?)
$(document).ready(function(){
  $(document.body).on('click', '.stafftablerow', function(){$(this).toggleClass('selectedstaff').siblings().removeClass('selectedstaff')})
})

$(document).ready(function(){
  $(document.body).on('click', '.deliverytablerow', function(){$(this).toggleClass('selecteddriver').siblings().removeClass('selecteddriver')})
})


//Formats time input for delivery to HH:mm
var cleaveTime = new Cleave("#returntimedata", {
  time: true,
  timePattern: ['h', 'm']
})

//Formats phone input for delivery to 000 00 000
var cleave = new Cleave("#telephonedata", {
  phone: true,
  phoneRegionCode: 'NO',
})

