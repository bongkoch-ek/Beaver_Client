import React from 'react'
import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from "@fullcalendar/interaction"
import TaskMember from '@/src/components/TaskMember';

export default function ProjectSchedule(props) {

    const data = [
        { id: 1, title: "testTitle", description: "123456789", startDate: "2024-11-02", dueDate: "2024-11-05", column: { status: "DONE" } },
        { id: 2, title: "testTitle", description: "123456789", startDate: "2024-11-02", dueDate: "2024-11-09", column: { status: "INPROGRESS" } },
        { id: 3, title: "testTitle", description: "123456789", startDate: "2024-11-02", dueDate: new Date().toISOString(), column: { status: "LATE" } },
        { id: 4, title: "testTitle", description: "123456789", startDate: "2024-11-05", dueDate: new Date().toISOString(), column: { status: "LATE" } },
        { id: 5, title: "testTitle", description: "123456789", startDate: "2024-11-04", dueDate: new Date().toISOString(), column: { status: "LATE" } },
    ]

    const today = new Date().toISOString().split('T')[0]
    console.log(today)
    //#region set prop
    let done = []
    let inProgress = []
    let late = []
    let event = []
    data.map((el) => {
        if (el.column.status === 'DONE')
            done.push(
                {
                    id: el.id,
                    title: el.title,
                    eventBackgroundColor: "#43A047",
                    eventTextColor: "#FFFFFF",
                    eventBorderColor: "#43A047"
                })
        else if (el.column.status === 'INPROGRESS')
            inProgress.push({
                id: el.id,
                title: el.title,
                eventBackgroundColor: "#5DB9F8",
                eventTextColor: "#FFFFFF",
                eventBorderColor: "#5DB9F8"
            })
        else if (el.column.status === 'LATE')
            late.push({
                id: el.id,
                title: el.title,
                eventBackgroundColor: "#E53935",
                eventTextColor: "#FFFFFF",
                eventBorderColor: "#E53935"
            })

        event.push({
            id: el.id,
            resourceId: el.id,
            title: el.title,
            start: el.startDate,
            end: el.column.status === 'LATE'? today : el.dueDate
        })
    })


    const resources = [
        {
            title: "Late",
            eventBackgroundColor: "#E53935",
            eventTextColor: "#FFFFFF",
            children: late
        },
        {
            title: "In Progress",
            children: inProgress
        },
        {
            title: "Done",
            children: done
        },
    ];
    const events = event
    //#endregion

    const handleEventMouseEnter = (info) => {
        const tooltip = document.createElement("div");
        tooltip.innerHTML = `<strong>${info.event.title}</strong><br>${info.event.start.toLocaleString()}`;
        tooltip.classList.add("tooltip");
        tooltip.style.position = "absolute";
        tooltip.classList.add("tooltip")
        tooltip.style.top = `${info.jsEvent.pageY + 10}px`;
        tooltip.style.left = `${info.jsEvent.pageX + 10}px`;
        document.body.appendChild(tooltip);
        info.el.tooltip = tooltip;
    };

    const handleEventMouseLeave = (info) => {
        if (info.el.tooltip) {
            document.body.removeChild(info.el.tooltip);
            info.el.tooltip = null;
        }
    };

    return (
        <div className="flex bg-gray-100 w-[90%] mx-auto  pt-[40px] ">
            <div className="h-auto w-full px-10 py-16 mb-6 bg-white rounded-[64px] flex-col justify-start items-start gap-16 inline-flex">
                <TaskMember/>
                <div className='flex w-full justify-center'>
                    <div className='flex bg-white px-10'>
                        <FullCalendar
                            plugins={[interactionPlugin, resourceTimelinePlugin]}
                            initialView="resourceTimelineMonth"
                            resourceAreaHeaderContent='Status'
                            resources={resources}
                            events={events}
                            editable={false}
                            selectable={true}
                            eventMouseEnter={handleEventMouseEnter}
                            eventMouseLeave={handleEventMouseLeave}
                            height="auto"
                            expandRows= {true}
                            viewHeight={"auto"}
                            eventClassNames="centered-event"
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}
