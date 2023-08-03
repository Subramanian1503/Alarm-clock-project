let already_existing_alarms = []

let created_alarm_index = 0;

const existing_alarm_list = document.getElementById("existing_alarm_list");
const create_alarm_button = document.getElementById("create_alarm-button");
const delete_alarm_button = document.getElementsByClassName("delete_alarm_button");

// create a alarm when set alarm button clicked
function create_alarm(event) {

    // Get inputs from the input button

    // Hours
    const input_hour = document.getElementById("hour_input").value;

    // Minutes
    const input_minute = document.getElementById("minute_input").value;

    // Minutes
    const input_second = document.getElementById("second_input").value;

    // time convention
    const input_time_convention = document.getElementById("time_convention").value;

    // Construct the object 
    const requested_alarm_time = {
        id: created_alarm_index,
        hours: input_hour,
        minutes: input_minute,
        seconds: input_second,
        time_conversion: input_time_convention
    }

    // Save the object in the existing static list
    already_existing_alarms.push(requested_alarm_time);

    // Render the page
    render_current_page();

    // Reset the value
    document.getElementById("hour_input").value = 0;

    document.getElementById("minute_input").value = 0;

    document.getElementById("time_convention").value = "AM";

    // Increment the index
    created_alarm_index += 1;
}

// Render page function to render the existing alaram and display
function render_current_page() {
    // Remove all the tasks from the list in user interface
    existing_alarm_list.innerHTML = "";

    // iterate the already created alarm list
    for (let existing_alarm of already_existing_alarms) {
        addExistingAlarmToDOM(existing_alarm);
    }
}

function addExistingAlarmToDOM(existing_alarm) {

    // Create a list element in DOM
    const listElement = document.createElement("li");

    listElement.setAttribute("class", "existing_alarm");

    // Update the list element with the list template with values of task object
    listElement.innerHTML =
        `<!-- show time display section -->
        <div id="marked_time_display">
            ${existing_alarm.hours}: ${existing_alarm.minutes}: ${existing_alarm.seconds} ${existing_alarm.time_conversion}
        </div>

        <div class="delete_existing_alarm_button">
            <button class="delete_alarm_button" data-id= ${existing_alarm.id}> - </button>
        </div>`;

    // Append the task element to the task list
    existing_alarm_list.append(listElement);
}

// Show alarm
function show_message(messg) {
    alert(messg);
}

// delete corresponding alarm when delete button clicked
function deleteAlarm(event) {

    const targetName = event.target.className;
    if (targetName === "delete_alarm_button") {

        console.log("Event triggered");

        // Get the data-id attribte value
        const id = event.target.getAttribute("data-id");

        // Filter the existing alarm from list
        let existing_alarms = already_existing_alarms.filter((alarm) => {
            if (alarm.id != id) {
                return alarm;
            }
        })

        // remove the existing alarm from list
        already_existing_alarms = existing_alarms;

        // render the page
        render_current_page();

    }
}


// Run this function for every 500 miliseconds
setInterval(function () {

    // Get current time
    var today = new Date();
    var currentHour = today.getHours();
    var currentMinute = today.getMinutes();
    var currentSecond = today.getSeconds();

    // Set the current time in the clock display
    document.getElementById('current_time_display_container').innerHTML =
        currentHour + ":" + currentMinute + ":" + currentSecond;

    // Check if the current time matches with any existing alarm created    
    for (let index = 0; index < already_existing_alarms.length; index++) {

        // If AM check with the direct time itself
        if (already_existing_alarms[index].time_conversion == "AM") {
            console.log(already_existing_alarms[index].hours + ":" + already_existing_alarms[index].minutes);
            if (already_existing_alarms[index].hours == currentHour && already_existing_alarms[index].minutes == currentMinute && already_existing_alarms[index].seconds == currentSecond) {
                alert("Time is " + currentHour + ":" + currentMinute + ":" + currentSecond)
            }
        }
        else {
            // If PM then reduce the current hour with 12 to match with 24 hours format
            if (already_existing_alarms[index].hours == (currentHour - 12) && already_existing_alarms[index].minutes == currentMinute && already_existing_alarms[index].seconds == currentSecond) {

                alert("Time is " + currentHour + ":" + currentMinute + ":" + currentSecond)
            }
        }
    }

}, 500);


// Handle the create alarm event
create_alarm_button.addEventListener("click", create_alarm);

// Handle all the click events
document.addEventListener("click", deleteAlarm);
