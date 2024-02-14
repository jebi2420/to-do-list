// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할 일이 추가된다
// delete 버튼을 누르면 할 일이 삭제된다
// check 버튼을 누르면 할 일 이 끝나면서 밑줄이 간다
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
    let taskContent = taskInput.value

    if(taskContent){
        taskList.push(taskContent)
        console.log(taskList);
        render();      
    }else{
        btnAdd.disabled = true;
    }
}

// task input창 리셋
function resetInput(){
    taskInput.value = "";
    btnAdd.disabled = false;
}

// 할 일 아이템 생성
function render(){
    let resultHTML = "";
    for (let i=0; i<taskList.length; i++){
        resultHTML += `
            <div class="task">
            <span>${taskList[i]}</span>
            <div class="btns">
            <button id="check-btn">check</button>
            <button id="delete-btn">delete</button>
            </div>
        </div>        
        `;
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}