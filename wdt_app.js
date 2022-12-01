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
    this.id = "staffID" + setTimeout( Date.now(), 1)
  }
}
class DeliverDriver extends Employee {
  constructor(name, surename, vehicle, telephone, deliveryAddress, returnTime){
    super(name, surename)
    this.vehicle = vehicle
    this.telephone = telephone
    this.deliveryAddress = deliveryAddress
    this.returnTime = returnTime
    this.id = "driverID" + setTimeout( Date.now(), 1)
  }
}

const staff = []
async function staffUserGet(){
  const response = await fetch('https://randomuser.me/api/?results=5&inc=name,email,picture,id')
  staffData = await response.json()
  staffData = await staffData.results.map(staffMember => 
  new StaffMember(staffMember.name.first, staffMember.name.last, staffMember.picture.medium, staffMember.email))
  staff.push(...staffData)
  addStaff()
}


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


$(document).ready(function(){
  $(document.body).on('click', '.stafftablerow', function(){$(this).toggleClass('selected').siblings().removeClass('selected')})
})


$("#clockout").click(function(){
  absence = parseInt(prompt("Please enter the duration of absence in minutes"))
  selected = $(".selected")
  selected.find("#status").text("Out")
  selected.find("#duration").text(moment().startOf('day').add(absence, 'minutes').format('HH:mm'))
  selected.find("#outtime").text(moment().format('HH:mm'))
  selected.find("#expectedreturntime").text(moment().add(absence, 'minutes').format('HH:mm')) 
  staffName = selected.find("#name").text()
  staffSurename = selected.find("#surename").text()
  staffPhoto = selected.find("img").attr("src")
  notifyDelay(staffName, staffSurename, staffPhoto, absence)
})


function notifyDelay(staffName, staffSurename, staffPhoto, absence) {
  timeoutID = setTimeout(() => {
  toastContent =
  `<div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
  <img src="${staffPhoto}" class="rounded me-2" alt="...">
  <strong class="me-auto">${staffName} ${staffSurename} have been away for ${absence} minutes</strong>
  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  </div>`
  document.getElementById("toastConteiner").innerHTML = toastContent //NOT WORKING WITH JQUERY FOR SOME REASON
  $('.toast').toast('show')
  $(`tr[timeoutid="${timeoutID}"]`).removeAttr("timeoutid")
  }, absence*60000)
  $(".selected").attr("timeoutid", timeoutID)
}


$("#clockin").click(function(){
  selected = $(".selected")
  selected.find("#status").text("In")
  selected.find("#outtime").text("")
  selected.find("#duration").text("")
  selected.find("#expectedreturntime").text("")
  timeoutID = selected.attr("timeoutid")
  $(`tr[timeoutid="${timeoutID}"]`).removeAttr("timeoutid")
  clearTimeout(timeoutID)
})


$(document).ready(function notifyDelay(){
  $("#liveToastBtn").click(function(){
    $(".toast").toast('show');
    $("#liveToast").toast("show");
  });
});

staffUserGet()


const drivers = []
$(document).ready(function(){
  $("#adddriver").click(function creteDeliveryDriver(){
    vehicle = $("#vehicledata").val()
    driverName = $("#namedata").val()
    driverSurename = $("#surenamedata").val()
    driverTelephone = $("#telephonedata").val()
    driverAddress = $("#addressdata").val()
    driverReturntime = $("#returntimedata").val()
    drivers.push(new DeliverDriver(driverName, driverSurename, vehicle, driverTelephone, driverAddress, driverReturntime))
    addDelivery()
  })
})


function addDelivery(){
  driversTableData=""
  drivers.map(driver => {
    driversTableData += 
    `<tr class="deliverytablerow">
    <td id="vehicle">${driver.vehicle}</td>
    <td id="name">${driver.name}</td>
    <td id="surename">${driver.surename}</td>
    <td id="telephone">${driver.telephone}</td>
    <td id="address">${driver.deliveryAddress}</td>
    <td id="returntime">${driver.returnTime}</td>
    </tr>`
  })
  document.getElementById("deliverydrivers").innerHTML = driversTableData //NOT WORKING WITH JQUERY FOR SOME REASON
}

