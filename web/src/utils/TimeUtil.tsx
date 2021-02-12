

export const Time = () => {
    const generateTime = (times: Array<string>, day: string) => {
        let beginningStartTime:number = 1000;
        let beginningEndTime:number = 1030;
        while (beginningStartTime < 1800) {
            times.push(day.toString() + beginningStartTime.toString() + '-' + day.toString() + beginningEndTime.toString());
            if(beginningStartTime.toString().substring(2,4) === '00') {
                beginningStartTime += 30;
                beginningEndTime += 70;
            } else {
                beginningStartTime +=70
                beginningEndTime += 30;
            }
        }
        return times;
    }
    
    let times: Array<string> = ['0900-0930', '0930-1000'];
    let times1: Array<string> = ['26120900-26120930', '26120930-26121000'];
    let times2: Array<string> = ['27120900-27120930', '27120930-27121000'];
    let times3: Array<string> = ['28120900-28120930', '28120930-28121000'];
    let times4: Array<string> = ['29120900-29120930', '29120930-29121000'];
    let times5: Array<string> = ['30120900-30120930', '30120930-30121000'];

    const firsttime = generateTime(times1,'2612');
    const secondtime = generateTime(times2,'2712');
    const thirdtime = generateTime(times3,'2812');
    const forthtime = generateTime(times4,'2912');
    const fifthtime = generateTime(times5,'3012');
    generateTime(times,'');
    let timeList = times.map((time,index)=> {
        return <li className="time">{time}</li>
    })   

    function getTime()  {
        return timeList;
    }

    return (
        {
            indexTime : timeList,
            firstTime : firsttime,
            secondTime : secondtime,
            thirdTime: thirdtime,
            forthTime: forthtime,
            fifthTime: fifthtime
        }
    )
}