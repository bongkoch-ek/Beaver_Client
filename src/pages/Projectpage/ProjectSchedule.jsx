import React from 'react'
import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from "@fullcalendar/interaction"
import TaskMember from '@/src/components/TaskMember';
import useDashboardStore from '@/src/stores/dashboardStore';
import moment from 'moment';

export default function ProjectSchedule(props) {

    const project = useDashboardStore(state => state.project)
    const today = new Date().toISOString().split('T')[0]

    //#region set prop
    let done = []
    let inProgress = []
    let late = []
    let event = []
    let resources = [];
    const events = event
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

    function AddResource() {
        if (late.length > 0) {
            resources.push({
                title: "Late",
                children: late
            })
        }
        if (inProgress.length > 0) {
            resources.push({
                title: "In Progress",
                children: inProgress
            })
        }
        if (done.length > 0) {
            resources.push({
                title: "Done",
                children: done
            })
        }
    }
    AddResource()

    //#endregion

    const handleEventMouseEnter = (info) => {
        const tooltip = document.createElement("div");
        tooltip.innerHTML = `<strong>${info.event.title}</strong><br>${"Start date :"}${moment(info.event.start).format("DD/MM/YYYY")}<br>${"Due date :"}${moment(info.event.end).format("DD/MM/YYYY")}`;
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
                {!resources.length > 0 ?
                    <p className='w-full flex justify-center'>No task in this project</p>
                    :
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
                                buttonText={{
                                    today: "Today"
                                }}
                            />
                        </div>
                    </div>
                }
            </div>
        </div>

    )
}
