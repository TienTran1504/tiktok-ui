import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <Image
                className={cx('avatar')}
                src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/8d7d7df27d961f69d418a4e21cb7b58c~c5_300x300.webp?x-expires=1663758000&x-signature=jYG%2BKUmEBJMyorORNQcBQY%2Fs8yk%3D"
                alt="Ngọc"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Ngô Mỹ Ngọc</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>cornie</span>
            </div>
        </div>
    );
}

export default AccountItem;
//Xử lý Account item ở mục lịch sử tìm kiếm
