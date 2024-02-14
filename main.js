// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할 일이 추가된다
// delete 버튼을 누르면 할 일이 삭제된다
// check 버튼을 누르면 할 일 이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 isComplete: false -> true
// 2. true이면 끝난걸로 간주하고 밑줄 긋기
// 3. false이면 안끝난걸로 간주하고 그대로
// 진행 중, 끝남 탭을 누르면, 언더바가 이동한다
// 끝남 탭은 끝난 아이템만, 진행 중 탭은 진행 중인 아이템만
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let btnAdd = document.getElementById("btn-add");
let taskList = [];

btnAdd.addEventListener("click", addTask)
taskInput.addEventListener("focus", resetInput)

btnAdd.disabled = true;

// 할 일 추가
function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    };

    if(task.taskContent){
        taskList.push(task)
        console.log(taskList);
        render();      
    }else{
        btnAdd.disabled = true;
        warning();
    }
}

// task input창 리셋
function resetInput(){
    taskInput.value = "";
    btnAdd.disabled = false;
}

function warning(){
    // let warningOption = 'width=500, height=300'
    // let warningWindow = window.open('', 'warning', warningOption);
    // let warningContent = '<h1>내용을 입력해주세요</h1>'
    // warningWindow.document.body.innerHTML = warningContent;
}

// 할 일 아이템 생성
function render(){
    let resultHTML = "";
    for (let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML += `
            <div class="task task-done">
                <div class="task-done">${taskList[i].taskContent}</div>
                <div class="btns">
                    <button onclick="toggleComplete('${taskList[i].id}')" id="check-btn"><i class="fa-solid fa-square-check"></i></button>
                    <button onclick="deleteTask('${taskList[i].id}')" id="delete-btn"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>                  
            `
        }else{
            resultHTML += `
                <div class="task">
                    <div>${taskList[i].taskContent}</div>
                    <div class="btns">
                        <button onclick="toggleComplete('${taskList[i].id}')" id="check-btn"><i class="fa-regular fa-square-check"></i></button>
                        <button onclick="deleteTask('${taskList[i].id}')" id="delete-btn"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                 </div>        
            `;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break; // 찾는 순간 나오게
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].pop();
            break; // 찾는 순간 나오게
        }
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}