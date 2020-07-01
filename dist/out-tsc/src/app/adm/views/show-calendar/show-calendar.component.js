import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import momentPlugin from '@fullcalendar/moment';
import { calendar } from '../../models/schemas';
import { forkJoin } from 'rxjs';
let ShowCalendarComponent = /** @class */ (() => {
    let ShowCalendarComponent = class ShowCalendarComponent {
        constructor(http, calendarService, datepipe, route, router, elementRef) {
            this.http = http;
            this.calendarService = calendarService;
            this.datepipe = datepipe;
            this.route = route;
            this.router = router;
            this.elementRef = elementRef;
            this.isDataAvailable = false;
            this.isServiceDataAvailable = false;
            this.startDate = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
            this.staffs = [];
            this.appointments = [];
            this.calendarPlugins = [resourceTimelinePlugin, interactionPlugin, momentPlugin];
            this.renderStaffs = [];
            this.hoverEvent = {};
            this.timeArr = [];
            this.availableSlots = {};
            this.dateList = [];
            this.dateListData = {};
            this.dateList2 = [];
            this.containerWidth = 0;
            this.initScrol = false;
            this.queue = false;
            this.slotWidth = 115;
            this.myCalendar = new calendar();
            this.CurrentDate = new Date();
        }
        ngOnInit() {
            this.title = "Show Calendar";
            this.groupData();
            $('.new-calender').hide();
            if (localStorage.getItem('calendar')) {
                this.myCalendar = JSON.parse(localStorage.getItem('calendar'));
                localStorage.removeItem('calendar');
                this.startDate = this.datepipe.transform(this.myCalendar.startDate, 'yyyy-MM-dd');
                this.reLoad();
            }
            if (localStorage.getItem('resappt')) {
                this.isResch = true;
                //let resp = JSON.parse(localStorage.getItem('resappt'));
            }
        }
        onDateChange(startDate) {
            this.myCalendar.startDate = startDate;
            let start_date = this.datepipe.transform(startDate, 'MM/dd/yyyy');
            // this.startDate =  this.datepipe.transform(startDate,'yyyy-MM-dd');
            this.calendarService.getDateId(start_date).subscribe(res => {
                this.dateId = res;
                if (this.myCalendar.groupID && this.myCalendar.DepartmentID && this.myCalendar.locationId) {
                    this.stafflistNames(this.myCalendar.groupID, this.myCalendar.DepartmentID, this.myCalendar.locationId, this.dateId);
                }
            });
        }
        stafflistNames(groupId, departId, locId, dateId) {
            this.staffs = [];
            this.renderStaffs = [];
            this.dateList = [];
            this.dateList2 = [];
            this.dateListData = {};
            this.isDataAvailable = false;
            if (groupId && departId && locId) {
                this.calendarService.getStaffList(groupId, departId, locId).subscribe(res => {
                    let staffList = Object.entries(res);
                    staffList.forEach((staffList, i) => {
                        this.staffs.push({ id: staffList[1].staffid, title: staffList[1].staffname, have_slots: false });
                    });
                    this.dateList.push(this.startDate);
                    this.staffSchedule(dateId, this.startDate);
                    this.previousDay = this.startDate;
                    this.nextDay = this.startDate;
                    this.getPreviousDate();
                    this.getNextDate();
                });
                this.calendarService.getService().subscribe(res => {
                    this.serviceList = res;
                    this.isServiceDataAvailable = true;
                });
            }
        }
        getPreviousDate() {
            var tomorrow = new Date(this.previousDay);
            tomorrow.setDate(tomorrow.getDate() - 1);
            this.previousDay = tomorrow.toJSON().split('T')[0];
            this.dateList.unshift(this.previousDay);
            this.calendarService.getDateId(this.previousDay).subscribe(res => {
                this.staffSchedule(res, this.previousDay);
            });
        }
        getNextDate() {
            var tomorrow = new Date(this.nextDay);
            tomorrow.setDate(tomorrow.getDate() + 1);
            this.nextDay = tomorrow.toJSON().split('T')[0];
            this.dateList.push(this.nextDay);
            this.calendarService.getDateId(this.nextDay).subscribe(res => {
                this.staffSchedule(res, this.nextDay);
            });
        }
        staffSchedule(dateId, dt) {
            let obj = { renderStaffs: {}, dateId: dateId, dt: dt };
            obj.minTime = '';
            obj.maxTime = '';
            let start_date = this.datepipe.transform(dt, 'yyyy-MM-dd');
            let apiQueue = [];
            this.queue = true;
            this.staffs.forEach((eachStaff, i) => {
                apiQueue.push(this.calendarService.getStaffAvailableslot(start_date, eachStaff.id));
                apiQueue.push(this.calendarService.getStaffSchedule(start_date, eachStaff.id, this.myCalendar.locationId));
                apiQueue.push(this.calendarService.getAppointment(dateId, eachStaff.id, this.myCalendar.programId));
            });
            forkJoin(apiQueue).subscribe(results => {
                let time_stamps = [];
                this.staffs.forEach((eachStaff, i) => {
                    obj.renderStaffs[eachStaff.id] = { title: eachStaff.title };
                    let availSlot = results[i * 3];
                    let availablity = results[(i * 3) + 1];
                    let appointments = results[(i * 3) + 2];
                    if (availablity.length) {
                        eachStaff.have_slots = true;
                    }
                    /* No of Avail slot*/
                    this.availableSlots[eachStaff.id] = availSlot.filter(a => a.numAppts != 0 && a.numAppts < a.freeSlots);
                    /* No of avail time */
                    obj.renderStaffs[eachStaff.id].availability = availablity;
                    obj.renderStaffs[eachStaff.id].appointments = [];
                    obj.renderStaffs[eachStaff.id].availableSlots = availablity.map(a => {
                        return a.startTime.split(' ').pop();
                    });
                    availablity.forEach((eachScheduleList) => {
                        let st = moment(eachScheduleList.startTime, "MMM D YYYY h:mm a").format('YYYY-MM-DDTHH:mm:ss');
                        let et = moment(eachScheduleList.endTime, "MMM D YYYY h:mm a").format('YYYY-MM-DDTHH:mm:ss');
                        time_stamps.push(new Date(st).getTime());
                        time_stamps.push(new Date(et).getTime());
                    });
                    /* Appointments */
                    appointments.forEach((eachAppointmentList) => {
                        let app = { className: 'event_' + eachAppointmentList.StatusName, data: eachAppointmentList, id: eachAppointmentList.appointmentid, resourceId: eachStaff.id, start: moment(eachAppointmentList.dtStart, "MMM D YYYY h:mm a").format('YYYY-MM-DDTHH:mm:ss'), end: moment(eachAppointmentList.dtEnd, "MMM D YYYY h:mm a").format('YYYY-MM-DDTHH:mm:ss'), title: eachAppointmentList.client, backgroundColor: '#370D9D', location: eachAppointmentList.location, program: eachAppointmentList.program, textColor: '#FFFFFF' };
                        app.widthRef = ((new Date(app.end).getTime() - new Date(app.start).getTime()) / 60000);
                        app.width = app.widthRef * (this.slotWidth / 60);
                        obj.renderStaffs[eachStaff.id].appointments.push(app);
                    });
                });
                obj.minTime = new Date(Math.min(...time_stamps)).toTimeString().split(' ')[0];
                obj.maxTime = new Date(Math.max(...time_stamps)).toTimeString().split(' ')[0];
                obj.timeArr = [];
                for (let i = parseInt(obj.minTime.split(':')[0]); i < parseInt(obj.maxTime.split(':')[0]); i++) {
                    obj.timeArr.push(i);
                }
                this.staffs.forEach((eachStaff, i) => {
                    obj.renderStaffs[eachStaff.id].appointments.forEach((appt) => {
                        let split = new Date(appt.start).toTimeString().split(' ')[0].split(':');
                        let st = parseInt(split[0]);
                        let ind = obj.timeArr.indexOf(st) * 60;
                        if (split[1] == '15') {
                            ind += 15;
                        }
                        else if (split[1] == '30') {
                            ind += 30;
                        }
                        appt.leftRef = ind;
                        appt.left = appt.leftRef * (this.slotWidth / 60);
                    });
                });
                obj.width = obj.timeArr.length * this.slotWidth;
                this.dateListData[dt] = obj;
                this.containerWidth = 0;
                this.dateList2 = [];
                this.dateList.forEach(v => {
                    if (this.dateListData[v] && this.dateListData[v].width) {
                        this.containerWidth += this.dateListData[v].width;
                        this.dateList2.push(v);
                    }
                });
                this.isDataAvailable = !!this.staffs.filter(a => a.have_slots).length;
                if (this.isDataAvailable && !this.initScrol) {
                    if (this.elementRef.nativeElement.querySelector('#scrollable-container')) {
                        this.initScrol = true;
                        let $this = this;
                        const slider = this.elementRef.nativeElement.querySelector('#scrollable-container');
                        let isDown = false;
                        let startX;
                        let scrollLeft;
                        slider.addEventListener('mousedown', (e) => {
                            isDown = true;
                            slider.classList.add('active');
                            startX = e.pageX - slider.offsetLeft;
                            scrollLeft = slider.scrollLeft;
                        });
                        slider.addEventListener('mouseleave', () => {
                            isDown = false;
                            slider.classList.remove('active');
                        });
                        slider.addEventListener('mouseup', () => {
                            isDown = false;
                            slider.classList.remove('active');
                            if (!$this.queue) {
                                if (slider.scrollLeft == 0) {
                                    $this.getPreviousDate();
                                }
                                else if (slider.scrollLeft == slider.scrollWidth - slider.clientWidth) {
                                    $this.getNextDate();
                                }
                            }
                        });
                        slider.addEventListener('mousemove', (e) => {
                            if (!isDown)
                                return;
                            e.preventDefault();
                            const x = e.pageX - slider.offsetLeft;
                            const walk = (x - startX) * 3; //scroll-fast
                            slider.scrollLeft = scrollLeft - walk;
                            console.log(slider.scrollLeft);
                        });
                        slider.addEventListener('wheel', (e) => {
                            e.preventDefault();
                            if (e.wheelDelta > 0) {
                                if (this.slotWidth < 150) {
                                    this.slotWidth++;
                                }
                            }
                            else {
                                if (this.slotWidth > 60) {
                                    this.slotWidth--;
                                }
                            }
                            this.containerWidth = 0;
                            this.dateList2 = [];
                            this.dateList.forEach(v => {
                                let obj = this.dateListData[v];
                                if (obj && obj.width) {
                                    this.staffs.forEach((eachStaff, i) => {
                                        obj.renderStaffs[eachStaff.id].appointments.forEach((appt) => {
                                            appt.left = appt.leftRef * (this.slotWidth / 60);
                                            appt.width = appt.widthRef * (this.slotWidth / 60);
                                        });
                                    });
                                    obj.width = obj.timeArr.length * this.slotWidth;
                                    this.containerWidth += obj.width;
                                    this.dateList2.push(v);
                                }
                            });
                        });
                    }
                }
                this.queue = false;
            });
        }
        groupData() {
            this.calendarService.getGroup().subscribe(res => {
                this.groups = res;
            });
        }
        getDepartmentData(e) {
            //let groupId = e.target.value;
            //this.groupId = groupId;
            //let groupId = this.myCalendar.groupID;
            this.isDataAvailable = false;
            this.stafflistNames(this.myCalendar.groupID, undefined, undefined, this.dateId);
            $('.new-calender').show();
            this.calendarService.getDepartment(this.myCalendar.groupID).subscribe(res => {
                this.departments = res;
            });
        }
        getLocationData(e) {
            //let departId = e.target.value;
            //this.departId = departId;
            this.isDataAvailable = false;
            this.stafflistNames(this.myCalendar.groupID, this.myCalendar.DepartmentID, undefined, this.dateId);
            this.calendarService.getLocation(this.myCalendar.DepartmentID).subscribe(res => {
                this.locations = res;
            });
        }
        getGroupLocationData(e) {
            //let groupId = e.target.value;
            this.calendarService.getGroupLocation(this.myCalendar.groupID).subscribe(res => {
                this.locations = res;
            });
        }
        getLocationId(e) {
            //let locId = e.target.value;
            //this.locId = locId;
            this.isDataAvailable = false;
            this.stafflistNames(this.myCalendar.groupID, this.myCalendar.DepartmentID, this.myCalendar.locationId, this.dateId);
        }
        getServiceId(id) {
            //this.serviceId = id;
            this.isDataAvailable = false;
            this.stafflistNames(this.myCalendar.groupID, this.myCalendar.DepartmentID, undefined, this.dateId);
        }
        newAppointment(e, dt, staff, slot) {
            e.stopPropagation();
            console.log(dt, staff, slot);
            if () {
            }
            else {
                let avails = this.
                ;
            }
        }
        handleDateClick(arg) {
            let calendarData = {};
            calendarData = { id: arg.resource.id, name: arg.resource.title, date: arg.date };
            localStorage.setItem('calendar', JSON.stringify(this.myCalendar));
            localStorage.setItem('calendarData', JSON.stringify(calendarData));
            if (this.isResch) {
                this.router.navigate(['/resched-appt']);
            }
            else {
                let avails = arg.resource.extendedProps.availability;
                let filter = avails.filter(a => {
                    let st = new Date(moment(a.startTime, "MMM D YYYY h:mm a").format('YYYY-MM-DDTHH:mm:ss')).getTime();
                    let et = new Date(moment(a.endTime, "MMM D YYYY h:mm a").format('YYYY-MM-DDTHH:mm:ss')).getTime();
                    let ct = new Date(arg.dateStr).getTime();
                    return st <= ct && ct < et;
                });
                if (filter.length == 1) {
                    this.router.navigate(['/new-appt']);
                }
            }
        }
        dayRender(e) {
            let date = this.datepipe.transform(new Date(e.date).getTime(), 'yyyy-MM-dd');
            let startDate = this.datepipe.transform(this.startDate, 'yyyy-MM-dd');
            if (date != startDate) {
                this.startDate = date;
                this.calendarService.getDateId(date).subscribe(res => {
                    this.dateId = res;
                    this.stafflistNames(this.myCalendar.groupID, this.myCalendar.DepartmentID, this.myCalendar.locationId, this.dateId);
                });
            }
        }
        eventResize(e) {
            let filter = this.appointments.filter(a => parseInt(a.id) === parseInt(e.event.id));
            if (filter.length) {
                let data = { "DateID": filter[0].data.DateID, "appointmentid": filter[0].data.appointmentid, "dtEnd": this.datepipe.transform(new Date(e.event.end).getTime(), 'MM-dd-yyyy HH:m:s a'), "dtStart": this.datepipe.transform(new Date(e.event.start).getTime(), 'MM-dd-yyyy HH:m:s a'), "locationid": filter[0].data.locationid, "notes": "reschdule", "programid": filter[0].data.programid };
                let resourceId = e.newResource ? e.newResource.id : filter[0]['resourceId'];
                this.calendarService.rescheduleAppointment(resourceId, data).subscribe(res => {
                });
            }
        }
        handleEventClick(info) {
            //console.log(info.event._def.extendedProps.data.appointmentid);
            console.log(info);
            let myJson = { appointmentid: info.event._def.extendedProps.data.appointmentid };
            localStorage.setItem('LSApptID', JSON.stringify(myJson));
            localStorage.setItem('calendar', JSON.stringify(this.myCalendar));
            this.router.navigate(['/edit-appt']);
        }
        handleEventRender(info, ele) {
            /*var tooltip = new Tooltip(info.el, {
              title: info.event.title,
              placement: 'top',
              trigger: 'hover',
              container: 'body'
            })*/
            if (info.event.title) {
                setTimeout(function () {
                    info.el.innerHTML = info.event.title + '<br>' + info.event.extendedProps.location;
                }, 100);
            }
        }
        ;
        showAppointmentData(e, data) {
            /*let filter = this.appointments.filter(a => parseInt(a.id) === parseInt(e.event.id));
            this.hoverEvent = [];
            if (filter.length > 0) {
              this.hoverEvent = filter[0].data;
            }*/
            this.hoverEvent = data.data;
            this.hoverEvent['left'] = e.clientX;
            this.hoverEvent['top'] = e.clientY;
        }
        hideAppointmentData(a) {
            this.hoverEvent = {};
        }
        reLoad() {
            this.stafflistNames(this.myCalendar.groupID, this.myCalendar.DepartmentID, this.myCalendar.locationId, this.dateId);
            this.isDataAvailable = false;
            //this.onDateChange(this.startDate);
            //this.myCalendar.startDate = this.startDate;
            let start_date = this.datepipe.transform(this.startDate, 'MM/dd/yyyy');
            this.calendarService.getDateId(start_date).subscribe(res => {
                this.dateId = res;
            });
            this.calendarService.getDepartment(this.myCalendar.groupID).subscribe(res => {
                this.departments = res;
            });
            this.calendarService.getGroupLocation(this.myCalendar.groupID).subscribe(res => {
                this.locations = res;
            });
            this.calendarService.getLocation(this.myCalendar.DepartmentID).subscribe(res => {
                this.locations = res;
            });
            //this.stafflistNames(this.myCalendar.groupID, this.myCalendar.DepartmentID);
        }
        swipeLeft() {
            this.calendarComponent.getApi().next();
        }
        swipeRight() {
            this.calendarComponent.getApi().next();
        }
    };
    __decorate([
        ViewChild('calendar', { static: false })
    ], ShowCalendarComponent.prototype, "calendarComponent", void 0);
    __decorate([
        ViewChild('scrollContainer', { static: false })
    ], ShowCalendarComponent.prototype, "scrollContainer", void 0);
    ShowCalendarComponent = __decorate([
        Component({
            selector: 'app-show-calendar',
            templateUrl: './show-calendar.component.html',
            styleUrls: ['./show-calendar.component.css'],
            providers: [DatePipe]
        })
    ], ShowCalendarComponent);
    return ShowCalendarComponent;
})();
export { ShowCalendarComponent };
import { Pipe } from '@angular/core';
let HaveslotsPipe = /** @class */ (() => {
    let HaveslotsPipe = class HaveslotsPipe {
        transform(items, searchText) {
            if (!items)
                return [];
            //if(!searchText) return items;
            //searchText = searchText.toLowerCase();
            return items.filter(it => {
                return it.have_slots;
            });
        }
    };
    HaveslotsPipe = __decorate([
        Pipe({
            name: 'haveslots'
        })
    ], HaveslotsPipe);
    return HaveslotsPipe;
})();
export { HaveslotsPipe };
//# sourceMappingURL=show-calendar.component.js.map