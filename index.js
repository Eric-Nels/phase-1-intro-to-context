function createEmployeeRecord(arr) {
   const record = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
   };
   return record;
};

function createEmployeeRecords(arr) {
    const records = [];
    arr.forEach(subArr => {
        const record = {
            firstName: subArr[0],
            familyName: subArr[1],
            title: subArr[2],
            payPerHour: subArr[3],
            timeInEvents: [],
            timeOutEvents: []  
        };
        records.push(record);
    });
    return records
};

function createTimeInEvent(record, date_time) {
    const [date, hour] = date_time.split(' ');
    const timeInEvent = {
        type: 'TimeIn',
        date: date,
        hour: parseInt(hour, 10) 
    };
    record.timeInEvents.push(timeInEvent);
    return record;
};

function createTimeOutEvent(record, date_time) {
    const [date, hour] = date_time.split(' ');
    const timeOutEvent = {
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour, 10) 
    };
    record.timeOutEvents.push(timeOutEvent);
    return record;
};


function hoursWorkedOnDate(record, date) {
    let timeIn;
    let timeOut;
    for(let i = 0; i < record.timeInEvents.length; i++) {
        if (record.timeInEvents[i].date === date) {
            timeIn = record.timeInEvents[i].hour;
            break;
        };
    };
    for(let i = 0; i < record.timeOutEvents.length; i++) {
        if (record.timeOutEvents[i].date === date) {
            timeOut = record.timeOutEvents[i].hour;
            break;
        };
    };
    const timeWorked = (timeOut - timeIn) / 100;
    return timeWorked; 
};

function wagesEarnedOnDate(record, date) {
    const rate = record.payPerHour;
    const timeWorked = hoursWorkedOnDate(record, date);
    const earned = timeWorked * rate;
    return earned;
};

function allWagesFor(record) {
    let totalWages = 0;
    for (let i = 0; i < record.timeInEvents.length; i++) {
      const date = record.timeInEvents[i].date;
      const earned = wagesEarnedOnDate(record, date);
      totalWages += earned;
    }
    return totalWages;
  };

  function calculatePayroll(array) {
    let payroll = 0;
    for (let i = 0; i<array.length; i++) {
        const employee = array[i];
        const earned = allWagesFor(employee);
        payroll += earned;
    }
    return payroll
  };
