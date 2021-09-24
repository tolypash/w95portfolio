import React from 'react';

import { useAppDispatch } from '../../Redux/hooks';

import Window from '../../components/organisms/Window';

import ProjectCard from './components/cards/Project';
import GlowIcon from './components/GlowIcon';
import { Linkedin, GitHub, Instagram } from 'react-feather';

import Particles from 'react-particles-js';

import styles from './AboutMe.module.scss'

import { Window as WindowProps } from '../../Redux/reducers/windows';


import SallyLogo from '../../assets/img/projects/sally/icon.png';

const SallySC1 = 'https://firebasestorage.googleapis.com/v0/b/sally-1578747294813.appspot.com/o/media%2Ftoly%2Fprojects%2Fsally%2F1.png?alt=media&token=560419fb-e1a5-4583-82f8-e7934747abac'
const SallySC2 = 'https://firebasestorage.googleapis.com/v0/b/sally-1578747294813.appspot.com/o/media%2Ftoly%2Fprojects%2Fsally%2F2.png?alt=media&token=3f7e35d5-a64e-4dd3-8598-546f031fb2e4'
const SallySC3 = 'https://firebasestorage.googleapis.com/v0/b/sally-1578747294813.appspot.com/o/media%2Ftoly%2Fprojects%2Fsally%2F3.png?alt=media&token=e1c1376f-9dbd-42bc-94ea-f8f6d7d4f600'

const NagsHeadLogo = 'https://firebasestorage.googleapis.com/v0/b/sally-1578747294813.appspot.com/o/media%2Ftoly%2Fprojects%2Fnagshead%2Ficon.png?alt=media&token=5cd64ffe-402d-4a51-b882-e9c2421f52ed'
const NagsHeadSC1 = 'https://firebasestorage.googleapis.com/v0/b/sally-1578747294813.appspot.com/o/media%2Ftoly%2Fprojects%2Fnagshead%2F1.PNG?alt=media&token=64c1fa4d-e4cc-4407-a4b6-b7a779333934'
const NagsHeadSC2 = 'https://firebasestorage.googleapis.com/v0/b/sally-1578747294813.appspot.com/o/media%2Ftoly%2Fprojects%2Fnagshead%2F2.png?alt=media&token=8fee2fea-ee56-4de4-b119-965aed2d7e32'
const NagsHeadSC3 = 'https://firebasestorage.googleapis.com/v0/b/sally-1578747294813.appspot.com/o/media%2Ftoly%2Fprojects%2Fnagshead%2F3.PNG?alt=media&token=30eab773-fa23-40d0-8c15-6a630df5d098'

const JMLogo = 'https://firebasestorage.googleapis.com/v0/b/sally-1578747294813.appspot.com/o/media%2Ftoly%2Fprojects%2Fjmdcs%2Ficon.png?alt=media&token=8a63c284-6f6e-47f5-b4e7-e761167e29b0'
const JMSC1 = 'https://firebasestorage.googleapis.com/v0/b/sally-1578747294813.appspot.com/o/media%2Ftoly%2Fprojects%2Fjmdcs%2F1.png?alt=media&token=babaf3a6-ca31-40b2-a6ad-115707fa3e2d'
const JMSC2 = 'https://firebasestorage.googleapis.com/v0/b/sally-1578747294813.appspot.com/o/media%2Ftoly%2Fprojects%2Fjmdcs%2F2.png?alt=media&token=bedfa592-34c1-4aee-a877-dd4adeffec4a'
const JMSC3 = 'https://firebasestorage.googleapis.com/v0/b/sally-1578747294813.appspot.com/o/media%2Ftoly%2Fprojects%2Fjmdcs%2F3.png?alt=media&token=fdc254c2-1be7-4857-84e2-60ff881c6b84'

const AboutMeProgram = (props: WindowProps) => {
    const dispatch = useAppDispatch()

    // const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    //     const y = e.currentTarget.scrollTop
    // }

    return (
        <Window
            {...props}
            dismiss={() => dispatch({ type: 'windows/kill', payload: props.id })}
            draggable
            defaultSize='max'
        >
            <div className={styles.Container}>
                <div className={styles.Main}>
                    <section className={styles.Head}>
                        HI THERE 👋, I'M

                        <div style={{ height: 144, marginTop: 30, marginBottom: 35 }}>
                            <div className={styles.NameContainer}>
                                <video autoPlay muted loop playsInline>
                                    <source
                                        src='https://firebasestorage.googleapis.com/v0/b/sally-1578747294813.appspot.com/o/media%2Ftoly%2Ffur.mp4?alt=media&token=f94498ed-65fa-4159-bd41-187d711255ce'
                                        type='video/mp4'
                                    />
                                </video>
                                <div className={styles.name}>
                                    Anatoly
                                    <br />
                                    Pashias.
                                </div>
                            </div>
                        </div>

                        <div>
                            <span className={styles.primary + ' semibold'}>FULL STACK DEVELOPER 👨‍💻</span>

                            <div className={styles.secondary} style={{ marginTop: 10 }}>
                                Based in Limassol, Cyprus
                            </div>
                        </div>

                        <div className={styles.ProfilePic}>
                            <img
                                src='https://firebasestorage.googleapis.com/v0/b/sally-1578747294813.appspot.com/o/media%2Ftoly%2Fme.jpg?alt=media&token=d55dc110-2647-46b6-b2ac-a03cd122d977'
                                alt='profile pic'
                            />
                        </div>
                    </section>

                    <section>
                        <span className={styles.secondary}>FEATURED PROJECTS</span>
                        <h2>My proudest work 😋</h2>

                        <ProjectCard
                            logoSrc={SallyLogo}
                            name='Sally'
                            tech={['React Native', 'React', 'Node.js', 'PHP', 'Firebase']}
                            desc={() => <>
                                Table ordering and payments application with a social twist where you can see where you friends are and send them gifts
                                <br />
                                <b>Role: </b>
                                Co-founder
                                <br />
                                <b>Requirements: </b>
                                2 mobile apps, 2 web apps, landing page
                                <br />
                                <b>Integrations: </b>
                                <a href='https://stripe.com/' target='_blank' rel='noreferrer'>Stripe</a>,
                                {' '}
                                <a href='https://www.jcc.com.cy/' target='_blank' rel='noreferrer'>JCC</a>,
                                {' '}
                                <a href='https://www.ncr.com/restaurants/aloha-pos' target='_blank' rel='noreferrer'>NCR Aloha POS</a>,
                                {' '}
                                <a href='https://www.oracle.com/industries/micros/' target='_blank' rel='noreferrer'>Oracle Micros POS</a>,
                                {' '}
                                <a href='https://www.softechltd.com/' target='_blank' rel='noreferrer'>Gladius POS</a>,
                            </>}
                            screenshots={[
                                SallySC1,
                                SallySC2,
                                SallySC3
                            ]}
                            webURL={'https://sally.app'}
                        />

                        <ProjectCard
                            logoSrc={NagsHeadLogo}
                            name='Nags Head Pub Delivery'
                            tech={['React Native', 'Node.js', 'Firebase']}
                            desc={() => <>
                                Dedicated delivery app for a pub in Limassol, Cyprus.
                                <br />
                                <b>Requirements: </b>
                                2 mobile apps: one for the user and one for the drivers, so that they can accept orders and it tracks their live location and displays it to the user, similar to UberEats
                                <br />
                                Find it on the App Store and Google Play!
                            </>}
                            screenshots={[
                                NagsHeadSC1,
                                NagsHeadSC2,
                                NagsHeadSC3
                            ]}
                        />

                        <ProjectCard
                            logoSrc={JMLogo}
                            name='JM Dental Ceramic Studio'
                            tech={['React Native', 'Node.js', 'Firebase']}
                            desc={() => <>
                                Orders app for dental lab JMDCS
                                <br />
                                Find it on the App Store and Google Play!
                            </>}
                            screenshots={[
                                JMSC1,
                                JMSC2,
                                JMSC3
                            ]}
                        />

                        <h2>🛠️  API integrations</h2>
                        <ul>
                            <li> <a href='https://wolt.com/' target='_blank' rel='noreferrer'>Wolt</a> {'<->'} NCR Aloha POS</li>
                        </ul>
                    </section>

                    <section>
                        <span className={styles.secondary}>ABOUT ME</span>
                        <h2>Let's get to know me, shall we?</h2>

                        <p>I enjoy creating apps with sensational user experiences and handling the backend in the meantime 😛<br />
                            I am self taught and have been coding since I was 16 (I'm 19 now) <span className={styles.tiny}>P.S. the 20s scare me 👀</span></p>

                        <p>What I know: <span className={styles.primary}>JavaScript (TypeScript, React, React Native, Node.js), PHP, Visual Basic, NoSQL, MySQL</span></p>

                        <p>What I'm learning right now: <span className={styles.primary}>MongoDB</span></p>

                        <p>I'm half Russian, half German, born in Germany but raised in beautiful Cyprus.<br />
                            I speak English, Greek and working on my Russian :3</p>
                    </section>

                    <section>
                        <span className={styles.secondary}>CONTACT</span>
                        <h2>I'm always down for a chat 😄</h2>

                        <div className={styles.Contact}>
                            <a href='mailto:anatoly@sally.app'>
                                <h3>anatoly@sally.app</h3>
                            </a>

                            <a href='tel:+35796338010'>
                                <h3>+357 96338010</h3>
                            </a>

                            <div className={styles.Socials}>
                                <GlowIcon link='https://www.linkedin.com/in/tolypash'>
                                    <Linkedin size={30} />
                                </GlowIcon>

                                <GlowIcon link='https://github.com/tolypash'>
                                    <GitHub size={30} />
                                </GlowIcon>

                                <GlowIcon link='https://instagram.com/tolypash'>
                                    <Instagram size={30} />
                                </GlowIcon>
                            </div>
                        </div>
                    </section>
                </div>

                <Particles
                    className={styles.Particles}
                    params={{
                        "particles": {
                            "number": {
                                "value": 200,
                                "density": {
                                    "enable": false
                                }
                            },
                            "size": {
                                "value": 3,
                                "random": true,
                                "anim": {
                                    "speed": 4,
                                    "size_min": 0.3
                                }
                            },
                            "line_linked": {
                                "enable": false
                            },
                            "move": {
                                "random": true,
                                "speed": 1,
                                "direction": "top",
                                "out_mode": "out"
                            }
                        }
                    }}
                />
            </div>
        </Window>
    )
}

export default AboutMeProgram