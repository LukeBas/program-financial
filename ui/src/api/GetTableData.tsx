import {useEffect, useRef, useState} from "react";
import './GetTableData.css';

const url = 'http://localhost:8000'
interface TableBodyProps {
    program: string;
    modelYear: string;
    setOrAddKeyValue: (key: string, value: boolean) => void;
    fieldsMapping: { [key: string]: boolean };
    removeKey: (key: string) => void;
}
interface TableData{
    "Approval Number": string | null;
    "CR": string | null;
    "Change Driver": string | null;
    "Change Title": string | null;
    "Cost": any | null;
    "ED&T": string | null;
    "Owner": string | null;
    "PDL Impact": string | null;
    "PMT": string | null;
    "Part Number": any | null;
    "TVM Binning": any | null;
    "VO Labor Impact": string | null;
    "VO Tooling & Facilities": any | null;
    "Vendor Tooling": any | null;
    "Weight Impact": string | null;
}

export const TableBody: React.FC<TableBodyProps> = ({program, modelYear, setOrAddKeyValue, fieldsMapping}) =>{
    const [data, setData] = useState<TableData>();
    const hasAnimated = useRef(false);

    async function GetTableData() {
        try {
            const response = await fetch(url + '/getTableData/'+program+'/'+modelYear);
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            } else {
                const result = await response.json();
                let sanitizedData = {
                    "Approval Number": result['Approval Number'],
                    "CR": result['CR'],
                    "Change Driver": result['Change Driver'],
                    "Change Title": result['Change Title'],
                    "Cost": result['Cost'],
                    "ED&T": result['ED&T'],
                    "Owner": result['"Owner"'],
                    "PDL Impact": result['PDL Impact'],
                    "PMT": result['"PMT"'],
                    "Part Number": result['Part Number'],
                    "TVM Binning": result['TVM Binning'],
                    "VO Labor Impact": result['VO Labor Impact'],
                    "VO Tooling & Facilities": result['VO Tooling & Facilities'],
                    "Vendor Tooling": result['Vendor Tooling'],
                    "Weight Impact": result['Weight Impact']
                };
                return sanitizedData;
            }
        } catch (error) {
            console.error("Erro: ", error);
        }
    }

    useEffect(() => {
        if (!data) return;
        Object.keys(data).forEach(key => {
            if (fieldsMapping[key] === undefined) {
                setOrAddKeyValue(key, true);
            }
        });
    }, [data]);

    useEffect(() => {
        async function orderingData() {
            const response = await GetTableData();
            if (response) {
                setData(response);
            }
        }
        orderingData();

        if(!hasAnimated.current){
            let obj = document.getElementById("table-body");
            if(obj){
                if(obj.className.includes("slide-in")){
                    obj.classList.remove("slide-in");
                    obj.classList.add("slide-out");
                    setTimeout(()=>{
                        obj.classList.remove("slide-out");
                        obj.classList.add("slide-in");
                    },500);
                } else {
                    if (obj.className.includes("slide-out")) {
                        obj.classList.remove("slide-out");
                        obj.classList.add("slide-in");
                    } else {
                        obj.classList.add("slide-in");
                        hasAnimated.current = true;
                        setTimeout(() => {
                            hasAnimated.current = false;
                        },500);
                    }
                }
            }
        }
    }, [program, modelYear]);

    function renderRows() {
        if (!data) return null;

        const columnsAmt = Object.keys(data).length;
        const rowsAmt = data.CR?.length || 0;
        const rows = [];

        for (let j = 0; j < rowsAmt; j++) {
            const cells = [];
            for (let i = 0; i < columnsAmt; i++) {
                const key = Object.keys(data)[i];
                // @ts-ignore
                const value = data[key];
                if(fieldsMapping[key]) {
                    if (Array.isArray(value) && value[j] !== undefined) {
                        cells.push(<td key={i}>{value[j]}</td>);
                    } else {
                        cells.push(<td key={i}></td>);
                    }
                }
            }
            rows.push(<tr key={j}>{cells}</tr>);
        }

        rows.push(<tr>
            {Object.keys(data)? Object.keys(data).map((key) => (
                <td className="empty-td"></td>
            )) : null}
        </tr>);
        return rows;
    }

    return(
        <div id="table-body" className="table-body">
            <table className="table-1">
                <thead>
                <tr>
                    {data && Object.keys(data).map((key) => (
                        fieldsMapping[key] &&
                        <th key={key}>{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {renderRows()}
                </tbody>
            </table>
        </div>
    );
}
