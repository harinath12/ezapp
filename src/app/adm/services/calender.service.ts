import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Variables } from './globalVariables';
// import { DIR_DOCUMENT } from '@angular/cdk/bidi';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  //urlBase = "http://alberta-api.ezsoftco.com";
  urlBase: string;
  urlBaseEzgoh: string;

  constructor(private http:HttpClient) {
    this.urlBase = Variables.domain + '/';
    this.urlBaseEzgoh = Variables.domainEzgoh + '/';
  }

  getGroup(){
    return this.http.get(this.urlBase+'/api/Group?status=1');
  }

  getService(){
    return this.http.get(this.urlBase+'/api/Program?StatusId=true');
  }

  getDepartment(groupId){
    return this.http.get(this.urlBase+'/api/Department?groupId='+groupId);
  }

  getLocation(departId){
    return this.http.get(this.urlBase+'/api/Location?departId='+departId);
  }

  getGroupLocation(groupId){
    return this.http.get(this.urlBase+'/api/Location?groupId='+groupId);
  }

  getDateId(date){
    return this.http.get(this.urlBase+'/api/Calendar?date='+date);
  }

  rescheduleAppointment(staffId, data){
    return this.http.post(this.urlBase+'/api/Appointment?staffID='+staffId, data);
  }

  getStaffList(groupId,deptId?,locId?){
    if(!deptId){
      deptId = 0;
    }
    if(!locId){
      locId = 0;
    }
    return this.http.get<StaffResponse>(this.urlBase+'/api/staff?groupId='+groupId+'&deptId='+deptId+'&locId='+locId)
  }

  getStaffSchedule(startDate?,staffId?,locId?){
    if(!startDate || startDate == 0){
      startDate = '0000-00-00';
    }
    if(!staffId){
      staffId = 0;
    }
    if(!locId){
      locId = 0;
    }
    return this.http.get(this.urlBase+'/api/StaffSchedule?startDate='+startDate+'&staffID='+staffId+'&locationId='+locId).toPromise();
  }

  getStaffAvailableslot(startDate?,staffId?){
    if(!startDate || startDate == 0){
      startDate = '0000-00-00';
    }
    if(!staffId){
      staffId = 0;
    }
    
    return this.http.get(this.urlBase+'/api/StaffSchedule?date='+startDate+'&staffId='+staffId).toPromise();
  }
  getStaffFreeSlot(date?,staffId?){
    return this.http.get(this.urlBase+'/api/StaffSchedule?date='+date+'&staffID='+staffId).toPromise();
  }

  getAppointment(dateId?,staffId?,serviceId?){
    if(!staffId){
      staffId = 0;
    }
    if(!dateId){
      dateId = 0;
    }
    if (!serviceId){
      return this.http.get(this.urlBase+'/api/Appointment?staffid='+staffId+'&DateId='+dateId).toPromise();
    } else{
      return this.http.get(this.urlBase+'/api/Appointment?staffid='+staffId+'&DateId='+dateId+'&&ServiceId='+serviceId).toPromise();
    }
  }
}

interface StaffResponse {
  id: string;
  title: string;
}
