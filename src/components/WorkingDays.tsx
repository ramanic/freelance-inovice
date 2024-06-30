import { set } from 'date-fns'
import React, { useEffect, useState } from 'react'

const WorkingDays = () => {

    const [date, setDate] = useState<string>()
    const [workingHours, setWorkingHours] = useState<number>(8)

    const [workingDays, setWorkingDays] = useState<number>(0)
    const findWorkingDays = (date?: string) => {
        console.log(date)
        if (!date) return 0
        const [year, month] = date.split('-').map(Number);
        const tempDate = new Date(year, month, 0);
        const daysInMonth = tempDate.getDate();
        let totalWorkingDays = 0

        for (let day = 1; day <= daysInMonth; day++) {
            const dayOfWeek = new Date(year, month - 1, day).getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                totalWorkingDays++;
            }
        }

        return totalWorkingDays

    }
    useEffect(() => {
        setWorkingDays(findWorkingDays(date));
    }, [date])
    return (
        <div>
            <div>
                Working Days for
                <input
                    style={{ marginRight: '10px', marginLeft: '10px', width: '100px' }}
                    type="month"
                    value={date}
                    onChange={(event) => setDate(event.target.value as string)}

                />

                : {workingDays} days
            </div>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                Total Working hour (
                <input
                    style={{ marginRight: '10px', marginLeft: '10px', width: '50px' }}
                    type='number'
                    onChange={(event) => setWorkingHours(parseInt(event.target.value))}
                    value={workingHours}
                />
                hrs per day ) : {workingDays * workingHours} hrs
            </div>
        </div>
    )
}

export default WorkingDays