class Employee {
  constructor(name, surename) {
      this.name = name;
      this.surename = surename;
   }
}
class StaffMember extends Employee {
  constructor(name, surename, photo, email, staffID) {
    super(name, surename)
      this.photo = photo
      this.email = email
      this.staffID = staffID
    }
  staffMemberisLate() {
    setTimeout(() => {
      console.log(`${this.name} ${this.surename} is late`)
    }, 1000)
  }
}
class DeliverDriver extends Employee {
  constructor(name, surename, vehicle, telephone, deliveryAddress){
    super(name, surename)
      this.vehicle = vehicle
      this.telephone = telephone
      this.deliveryAddress = deliveryAddress
  }
}

async function staffUserGet() {
  const response = await fetch('https://randomuser.me/api/?results=5&inc=name,email,picture,id')
  staff = await response.json()
  console.log(staff)
  staff = await staff.results.map(staffMember => 
  new StaffMember(staffMember.name.first, staffMember.name.last, staffMember.picture.medium, staffMember.email, staffMember.id.value))
  tableData=""
  staff.map(staffMembers => {
    tableData += 
    `<tr id="${staffMembers.staffID}" class="stafftablerow">
    <td id="photo"><img src="${staffMembers.photo}"></td>
    <td id="name">${staffMembers.name}</td>
    <td id="surename">${staffMembers.surename}</td>
    <td id="email">${staffMembers.email}</td>
    <td id="status">In</td>
    <td id="outtime"></td>
    <td id="duration"></td>
    <td id="expectedreturntime"></td>
    <td id="late"></td>
    </tr>`})
  document.getElementById("staffmembers").innerHTML = tableData //NOT WORKING WITH JQUERY FOR SOME REASON
}

$(document).ready(function(){
  $(document.body).on('click', '.stafftablerow', function(){$(this).toggleClass('selected')})
})

$("#clockout").click(function(){
  absence = parseInt(prompt("Please enter the duration of absence in minutes"))
  selected = $(".selected")
  selected.find
  selected.find("#status").text("Out")
  selected.find("#duration").text(absence)
  selected.find("#outtime").text(moment().format('HH:mm'))
  staffName = selected.find("#name").text()
  staffSurename = selected.find("#surename").text()
  staffPhoto = selected.find("img").attr("src")
  notifyDelay(staffName, staffSurename, staffPhoto, absence)
})

function notifyDelay(staffName, staffSurename, staffPhoto, absence) {
  setTimeout(() => {
  toastContent =
  `<div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
  <img src="${staffPhoto}" class="rounded me-2" alt="...">
  <strong class="me-auto">${staffName} ${staffSurename} have been away for ${absence} minutes</strong>
  <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  </div>`
  document.getElementById("toastConteiner").innerHTML = toastContent
  $('.toast').toast('show')
  }, absence*100)
}

$("#clockin").click(function(){
  selected = $(".selected")
  selected.find("#status").text("In")
  selected.find("#outtime").text("")
  selected.find("#duration").text("")
  selected.find("#expectedreturntime").text("")
})

$(document).ready(function notifyDelay(){
  $("#liveToastBtn").click(function(){
    $(".toast").toast('show');
    $("#liveToast").toast("show");
  });
});

staffUserGet()





