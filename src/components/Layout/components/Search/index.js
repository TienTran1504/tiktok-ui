import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true); // kiểm tra trạng thái có đang focus vào input hay không
    const [loading, setLoading] = useState(false);

    // lần đầu tiên chạy debounced có giá trị ''
    // lần 2 nhập chữ h thì lọt vào useEffect bên file useDebounce.js thì nó đã có setTimeout 500s nên nó sẽ vẫn còn là chuỗi rỗng tương tự như lần tiếp theo
    // đến khi hoàn thành gõ thì sau 500s nó sẽ set lại debounce value và nó render lại chuỗi cuối cùng
    const debounced = useDebounce(searchValue, 500); // truyền vào giá trị muốn delay và khoảng thời gian muốn delay
    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true); // trước khi gõ api set loading lại true

        //encodeURIComponent để mã hoá các ký tự đặc biệt gây hiểu lầm trên URL thành ký tự hợp lệ vd : &,...
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);
                setLoading(false); // gọi api xong set lại bằng false
            })
            .catch(() => {
                setLoading(false);
            });
    }, [debounced]);
    const handleClear = () => {
        setSearchValue(''); // clear nội dung ô search
        setSearchResult([]);
        inputRef.current.focus(); // sau khi clear thì focus lại ô đó
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Account</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck={false /* tắt kiểm tra chính tả*/}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue &&
                    !loading && ( // nếu có nhập ký tự hay loading đang không chạy thì hiện nút close
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
