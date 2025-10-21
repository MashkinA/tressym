import { Component } from 'react';
import cl from "../styles/Pages.module.css";
import StartButton from "../components/StartButton/StartButton.tsx";

export class ErrorPage extends Component {
    render() {
        return (
            <main className={cl.pageWrapper}>
                <div className={cl.errorPage}>
                    <img className={cl.tressymImg} src="/assets/icons/tressym.webp" alt="" />
                    <h2 className={cl.errorTitle}>Такой страницы нет</h2>
                    <StartButton path={"/"}> На главный экран </StartButton>
                </div>
            </main>
        );
    }
}