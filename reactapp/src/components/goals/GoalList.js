import { Table,Text} from '@mantine/core';
import {useSelector} from "react-redux";
import { ReactComponent as EditSVG } from '../../assets/Edit.svg';
import {useState} from "react";
import GoalEditForm from "./GoalEditForm";

export default function GoalList() {

    const goalList = useSelector(state => state.goal.goalList)
    const [displayGoalEditForm,setDisplayGoalEditForm] = useState(false);
    const [selectedEditElement,setSelectedEditElement] = useState(null);
    function handleGoalEditFormClose(){
        setDisplayGoalEditForm(false)
    }
    function handleEdit(element){
        setSelectedEditElement(element)
        setDisplayGoalEditForm(true)
    }

    function handleDate(date){
        const formatDate = new Date(date)
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return formatDate.toLocaleDateString('en-US',dateOptions)
    }

    const rows = goalList.map((element) => (
        <tr key={element.name}>
            <td><Text fw={700}>{element.name}</Text><Text c={"dimmed"} size={"xs"}>{element.description}</Text></td>
            <td><Text fw={700}>{handleDate(element.targetDate)}</Text></td>
            <td><Text fw={700}>{`VND ${element.targetAmount}`}</Text></td>
            <td><Text fw={700}>{element.status}</Text></td>
            <td>{<EditSVG onClick={() => handleEdit(element) }/>}</td>
        </tr>
    ));

    return (
        <div>
            {displayGoalEditForm &&  <GoalEditForm element={selectedEditElement} open={displayGoalEditForm} close={handleGoalEditFormClose}/>}
            <Table verticalSpacing="lg">
                <thead>
                    <tr>
                        <th><Text c="dimmed">TÊN</Text></th>
                        <th><Text c="dimmed">NGÀY MỤC TIÊU</Text></th>
                        <th><Text c="dimmed">SỐ TIỀN</Text></th>
                        <th><Text c="dimmed">TRẠNG THÁI</Text></th>
                        <th><Text c="dimmed">CHỈNH SỬA</Text></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    )
}