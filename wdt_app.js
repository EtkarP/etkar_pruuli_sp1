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
  const data = await response.json()
  const staff = data.results.map(user => new StaffMember(user.name.first, user.name.last, user.picture.large, user.email))
  return staff
}

