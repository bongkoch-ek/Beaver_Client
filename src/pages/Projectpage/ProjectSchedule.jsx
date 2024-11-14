import React from 'react'
import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from "@fullcalendar/interaction"
import TaskMember from '@/src/components/TaskMember';
import useDashboardStore from '@/src/stores/dashboardStore';

export default function ProjectSchedule(props) {

    const project = useDashboardStore(state => state.project)
    const today = new Date().toISOString().split('T')[0]

    //#region set prop
    let done = []
    let inProgress = []
    let late = []
    let event = []
    project.list.map((el) => {
        if (el.status === 'INPROGRESS') {
            el.task.map(el => {
                if (el.dueDate && new Date(el.dueDate) < new Date(today)) {
                    late.push({
                        id: el.id,
                        title: el.title,
                        eventBackgroundColor: "#E53935",
                        eventTextColor: "#FFFFFF",
                        eventBorderColor: "#E53935"
                    })
                }
                else {
                    inProgress.push({
                        id: el.id,
                        title: el.title,
                        eventBackgroundColor: "#5DB9F8",
                        eventTextColor: "#FFFFFF",
                        eventBorderColor: "#5DB9F8"
                    })
                }
                event.push({
                    id: el.id,
                    resourceId: el.id,
                    title: el.title,
                    start: el.startDate || el.createdAt,
                    end: el.dueDate || today
                })
            })
        }
        else if (el.status === 'DONE') {
            el.task.map(el => {
                done.push({
                    id: el.id,
                    title: el.title,
                    eventBackgroundColor: "#43A047",
                    eventTextColor: "#FFFFFF",
                    eventBorderColor: "#43A047"
                })
                event.push({
                    id: el.id,
                    resourceId: el.id,
                    title: el.title,
                    start: el.startDate || el.createdAt,
                    end: el.dueDate || el.updatedAt
                })
            })
        }
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
                            expandRows={true}
                            viewHeight={"auto"}
                            eventClassNames="centered-event"
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}
