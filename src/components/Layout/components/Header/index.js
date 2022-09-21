import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignIn,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import routesConfig from '~/config/routes';
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    code: 'en',
                    title: 'English',
                },
                {
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },

    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },

    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcut',
    },
];
// cx =('post-item')
// console.log(object);
function Header() {
    const currentUser = true; // giả sử có user log in

    //Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                //handle change language
                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@tien',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={routesConfig.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 50]} content="Upload Video" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>3</span>
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary rightIcon={<FontAwesomeIcon icon={faSignIn} />}>
                                Log in
                            </Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/1b9fb479d9ff8f972bcb96200fbe9f85.jpeg?x-expires=1663833600&x-signature=ykTZOJzzYm%2BvzXQ2PmXpCDGYEjI%3D"
                                className={cx('user-avatar')}
                                alt="Trần Dũng Tiến"
                                //khi ảnh source bị lỗi nó sẽ lấy link ảnh trong fallback
                                fallback="data:image/jpeg;base64,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"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
