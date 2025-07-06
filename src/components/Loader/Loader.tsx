import cl from './Loader.module.css';

export const Loader = () => {
    return (
        <div className={cl.loader}>
            <img className={cl.head} src="/assets/loader/head.webp" alt="" />
            <img className={cl.rightWing} src="/assets/loader/rightWing.webp" alt="" />
            <img className={cl.leftWing} src="/assets/loader/leftWing.webp" alt="" />
        </div>
    );
};