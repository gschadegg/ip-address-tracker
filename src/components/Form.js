import styles from './Form.module.scss'

const Form = ({ searchIP }) => {
    return(
        <form onSubmit={searchIP}>
            <input placeholder="Search for any IP address of domain"/>
            <button className={styles['btn-submit']} type="submit"></button>
        </form>
    )
}

export default Form