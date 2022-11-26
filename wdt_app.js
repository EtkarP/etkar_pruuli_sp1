class Employee {
  constructor(name, surename) {
      this.name = name;
      this.surename = surename;
   }
}
class StaffMember extends Employee {
  constructor(name, surename, photo, email) {
    super(name, surename)
      this.photo = photo
      this.email = email
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
  const response = await fetch('https://randomuser.me/api/?results=5&inc=name,email,picture,')
  staff = await response.json()
  staff = staff.results.map(staffMember => 
  new StaffMember(staffMember.name.first, staffMember.name.last, staffMember.picture.medium, staffMember.email))
  tableData=""
  staff.map(staffMembers => {
    tableData += 
    `<tr>
    <td><img src="${staffMembers.photo}"></td>
    <td>${staffMembers.name}</td>
    <td>${staffMembers.surename}</td>
    <td>${staffMembers.email}</td>
    <td id="status">In</td>
    <td id="outtime"></td>
    <td id="duration"></td>
    <td id="expectedreturntime"></td>
    </tr>`})
    document.getElementById("staffmembers").innerHTML = tableData
}
staffUserGet()
