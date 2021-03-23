import React from 'react'
import styles from './Notification.module.scss'

const Notification = ({ message }) => {
    return(
        <article className={styles['notification']}>
            <p>{ message }</p>
        </article>
    )
}

export default Notification