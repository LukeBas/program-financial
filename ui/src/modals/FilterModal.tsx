import './FilterModal.css';
import Modal from 'react-modal';
import { fieldsArray } from "../api/fieldsArray.tsx";
import {useEffect, useState} from "react";

Modal.setAppElement('#root');

export const FilterModal = ({ modalIsOpen, setModalIsOpen, setOrAddKeyValue, fieldsMapping, removeKey }: any) => {
    const [allChecked, setAllChecked] = useState(true);

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSelectAll = () => {
        const newCheckedState = !allChecked;
        fieldsArray.forEach((field: any) => {
            setOrAddKeyValue(field, newCheckedState);
        });
        setAllChecked(newCheckedState);
    };

    useEffect(() => {
        const allFieldsTrue = fieldsArray.every(field => fieldsMapping[field]);
        setAllChecked(allFieldsTrue);
    }, [fieldsMapping]);

    return (
        <div>
            <Modal
                className="filter-modal"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <h2>Select the columns you desire to filter</h2>
                <div>
                    <ul className="filter-list">
                        <li className="select-all">
                            <input
                                checked={allChecked}
                                type="checkbox"
                                onChange={handleSelectAll}
                            />
                            <label>Mark All</label>
                        </li>
                        {fieldsArray && fieldsArray.map((field: any, index: number) => (
                            <li key={index}>
                                <input
                                    className="filter-checkbox"
                                    type="checkbox"
                                    checked={fieldsMapping[field] || false}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setOrAddKeyValue(field, true);
                                        } else {
                                            removeKey(field);
                                        }
                                    }}
                                />
                                <label>{field}</label>
                            </li>
                        ))}
                    </ul>
                </div>
                <button className="close-modal" onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
};
