import React from 'react'
import styles from './IPdetail.module.scss'

const IPdetail = ({ header, data }) => {
    return(
        <section className={styles['ip-details']}>
            <header className={styles['ip-header']}>{header}</header>
            <section className={styles['ip-content']}>{data}</section>
        </section>
    )
}

export default IPdetail