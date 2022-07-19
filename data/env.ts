class url  { 
  
   shared = {
    // Default user logged in for most tests
   
  };
  
   staging = {
    "url": "https://spl9-pt99-2.parentlink.net/",
    "supportUserName": "spl9support",
    "supportPassword": "pw",
    "orgID": "2000003067",
    "orgID2": "2000002576",
    "districtID": "2000001172",
    "organizationName": "Automation Org - Do Not Delete",
    "orgExternalID": "automation",
    "emailAddress": "poornima.sridharan@blackboard.com",
    "teacherUserName": "automation_teacher",
    "teacherPassword": "pass@123",
    "parentUserName": "automation_parent",
    "parentPassword": "pass@123",
    "studentUserName": "automation_student",
    "studentPassword": "pass@123",
    "principalUserName": "automation_principal",
    "principalPassword": "pass@123",
    "attendanceSeceratoryUserName": "automation_attendance_seceratory",
    "attendanceSeceratoryPassword": "pass@123",
    "districtAdminUserName": "automation_district_admin",
    "districtAdminPassword": "pass@123",
    "superintendentUserName": "automation_superintendent",
    "superintendentPassword": "pass@123",
    "phoneNumber":"2029813253",
    "smsNumber": "2029813253",
    "organizationName2": "Aachi Global School"
  };

   qa = {
    "url": "https://spl9-pt99-2.parentlink.net/",
    "supportUserName": "spl9support",
    "supportPassword": "pw",
    "orgID": "2000003067",
    "orgID2": "2000002576",
    "districtID": "2000001172",
    "organizationName": "Automation Org - Do Not Delete",
    "orgExternalID": "automation",
    "emailAddress": "poornima.sridharan@blackboard.com",
    "teacherUserName": "automation_teacher",
    "teacherPassword": "pass@123",
    "parentUserName": "automation_parent",
    "parentPassword": "pass@123",
    "studentUserName": "automation_student",
    "studentPassword": "pass@123",
    "principalUserName": "automation_principal",
    "principalPassword": "pass@123",
    "attendanceSeceratoryUserName": "automation_attendance_seceratory",
    "attendanceSeceratoryPassword": "pass@123",
    "districtAdminUserName": "automation_district_admin",
    "districtAdminPassword": "pass@123",
    "superintendentUserName": "automation_superintendent",
    "superintendentPassword": "pass@123",
    "phoneNumber":"2029813253",
    "smsNumber": "2029813253",
    "organizationName2": "Aachi Global School"
  };
   dev = {
    "url": "https://spl9-pt99-2.parentlink.net/",
    "supportUserName": "spl9support",
    "supportPassword": "pw",
    "orgID": "2000003067",
    "orgID2": "2000002576",
    "districtID": "2000001172",
    "organizationName": "Automation Org - Do Not Delete",
    "orgExternalID": "automation",
    "emailAddress": "poornima.sridharan@blackboard.com",
    "teacherUserName": "automation_teacher",
    "teacherPassword": "pass@123",
    "parentUserName": "automation_parent",
    "parentPassword": "pass@123",
    "studentUserName": "automation_student",
    "studentPassword": "pass@123",
    "principalUserName": "automation_principal",
    "principalPassword": "pass@123",
    "attendanceSeceratoryUserName": "automation_attendance_seceratory",
    "attendanceSeceratoryPassword": "pass@123",
    "districtAdminUserName": "automation_district_admin",
    "districtAdminPassword": "pass@123",
    "superintendentUserName": "automation_superintendent",
    "superintendentPassword": "pass@123",
    "phoneNumber":"2029813253",
    "smsNumber": "2029813253",
    "organizationName2": "Aachi Global School"
  };
}
  // const generateConfig = () => {
  //   const environment =
  //     process.env.TEST_ENV === 'staging' ? staging : shared;
  //   return { ...shared, ...environment, ...staging };
  // };
  
  export default new url();
  
  