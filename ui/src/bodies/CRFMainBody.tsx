import './CRFMainBody.css'
import Search from '../assets/search.png'
import Filter from '../assets/filter.png'
import {GetProgramsInformation} from "../api/GetProgramMY.tsx";
import {useState, useEffect, useRef} from "react";
import {TableBody} from "../api/GetTableData.tsx"
import {FilterModal} from "../modals/FilterModal.tsx";

interface Program {
    modelYear: string;
    program: string;
}

export const CRFMainBody = () => {
    let hasAnimated = useRef(false);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [fieldsMapping, setFieldsMapping] = useState<{ [key: string]: boolean }>({});

    const setOrAddKeyValue = (key: string, value: boolean) => {
        setFieldsMapping(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const removeKey = (key: string) => {
        setOrAddKeyValue(key, false);
    };

    let programsArray;

    const openModal = () => {
        setModalIsOpen(true);
    };

    const [selectedProgram, setSelectedProgram] = useState<string>("");
    const [selectedMY, setSelectedMY] = useState<string>("");

    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredPrograms = programs.filter(program =>
        program.modelYear.toUpperCase().includes(searchTerm.toUpperCase())
        || program.program.toUpperCase().includes(searchTerm.toUpperCase())
    );

    useEffect(() => {
        async function populateArrays(){
            programsArray = await GetProgramsInformation()
            if(programsArray){
                const uniquePrograms = programsArray.reduce((acc: Program[], current: Program) => {
                    const isDuplicate = acc.some(program =>
                        program.modelYear === current.modelYear && program.program === current.program
                    );
                    if (!isDuplicate) {
                        acc.push(current);
                    }
                    return acc;
                }, []);
                setPrograms(uniquePrograms);
            }
        }
        populateArrays();
    }, []);

    useEffect(() => {
        if(!hasAnimated.current) {
            let obj = document.getElementById("table-title");
            if (obj) {
                obj.classList.add("show-fade");
                setTimeout(() => {
                    obj.classList.remove("show-fade");
                }, 2000)
                hasAnimated.current = true;
            } else {
                return
            }
        }
    }, [selectedMY, selectedProgram]);
    return(
        <div className="main-conteiner-crf">
            <div className="title-container">
                <h3>CRF - OVERVIEW</h3>
            </div>
            <div className="main-container">
                <div className="lateral-container">
                    <ul className="items-list">
                        <li className="search-program-list" >
                            <input onChange={(e)=>{setSearchTerm(e.target.value)}} className="search-program" type="text" placeholder="Search"/>
                            <img alt="search-icon" className="search-icon" src={Search}/>
                        </li>
                        <li className="add-program" onClick={openModal}>
                            <p>Filter</p>
                            <img alt="filter-icon" className="filter-icon" src={Filter}/>
                        </li>
                        <ul className="program-list-ul">
                            {filteredPrograms.map((prog, index) => (
                                <li key={index} className="program-list" onClick={() => {
                                    setSelectedProgram(prog["program"]);
                                    setSelectedMY(prog["modelYear"]);
                                }}>
                                    <p className="program-name">{prog["program"]}<span className="arrow">{"▶"}</span></p>
                                    <p className="program-model">{prog["modelYear"]}</p>
                                </li>
                            ))}
                            {filteredPrograms.length == 0 && <li>No program or MY found</li>}
                        </ul>
                    </ul>
                    <FilterModal
                        modalIsOpen={modalIsOpen}
                        setModalIsOpen={setModalIsOpen}
                        setOrAddKeyValue={setOrAddKeyValue}
                        removeKey={removeKey}
                        fieldsMapping={fieldsMapping}
                    />
                </div>
                <div className="body-container">
                    {
                        selectedMY != "" && selectedProgram != ""?
                            <>
                                <h2 id="table-title" className="table-title">Data Visualization: {selectedProgram}|{selectedMY}</h2>
                                <TableBody
                                    program={selectedProgram}
                                    modelYear={selectedMY}
                                    setOrAddKeyValue={setOrAddKeyValue}
                                    removeKey={removeKey}
                                    fieldsMapping={fieldsMapping}
                                />
                            </>
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    )
}