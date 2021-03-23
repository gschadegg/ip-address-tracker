import React from 'react'
import IPdetail from './IPdetail'
import styles from './IPinfo.module.scss'

const IPinfo = ({ IPdata }) => {
    let viewInfo
    if(!IPdata){
        const headers = ['IP Address', 'Location', 'Timezone', 'ISP']
        viewInfo = headers.map((key, idx) => {
            return <IPdetail key={idx} header={key} data='--'/>
        })
    } else {
        viewInfo = Object.keys(IPdata).map((key, idx) => {
            return <IPdetail key={idx} header={key} data={IPdata[key]}/>
        })
    }
    
    return(
        <article className={styles['ip-information']}>
            {viewInfo}
        </article>
    )
}

export default IPinfo


