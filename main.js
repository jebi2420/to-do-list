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
let tabs = document.querySelectorAll(".tab-type div")// Node List로 여러 개 항목 갖고 오기
let taskList = [];
let mode = 'all';
let filterList = [];
let underLine = document.getElementById("tab-underline");

tabs.forEach(tabs=>tabs.addEventListener("click", (e)=>indicator(e)))

function indicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop 
    + "px" + e.currentTarget.offsetHeight + "px";
}

btnAdd.addEventListener("click", addTask)
taskInput.addEventListener("focus", resetInput)

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})
}

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
    alert("내용을 입력해주세요");
}

// UI 생성
function render(){
    // 1. 내가 선택한 탭에 따라서
    // 2. 리스트를 달리 보여준다
    // all : taskList
    // ongoing, done : filterList
    let list = [];
    if(mode === "all"){
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }
    
    let resultHTML = "";
    for (let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `
            <div class="task task-done">
                <div class="task-done">${list[i].taskContent}</div>
                <div class="btns">
                    <button onclick="toggleComplete('${list[i].id}')" id="check-btn"><i class="fa-solid fa-square-check"></i></button>
                    <button onclick="deleteTask('${list[i].id}')" id="delete-btn"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>                  
            `
        }else{
            resultHTML += `
                <div class="task">
                    <div>${list[i].taskContent}</div>
                    <div class="btns">
                        <button onclick="toggleComplete('${list[i].id}')" id="check-btn"><i class="fa-regular fa-square-check"></i></button>
                        <button onclick="deleteTask('${list[i].id}')" id="delete-btn"><i class="fa-regular fa-trash-can"></i></button>
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

            if(mode === "ongoing" && taskList[i].isComplete){
                // 진행 중인 상태에서 끝난 항목으로 전환 시
                // 해당 항목을 filterList에 추가, taskList에서 삭제
                filterList = filterList.filter(task => task.id !== id);
            }
            break; // 찾는 순간 나오게
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id){
    console.log("dele id:" + id)
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            // 해당 id를 가진 taskList[i]를 삭제
            taskList.splice(i,1);
            // 진행 중, 끝남 일때도 delete 되게, 필터링 리스트 업데이트
            filterList = filterList.filter(task => task.id !== id)
            break; // 찾는 순간 나오게
        }
    }
    // 값이 업데이트 되면 UI도 업데이트 해줘야 함
    render()
}

function filter(event){
    mode = event.target.id;// event가 일어난 target의 id를 들고 옴
    filterList = [];
    if(mode === "all"){
        // 전체 리스트를 보여준다
        render();
    }else if(mode === "ongoing"){
        // 진행중인 아이템을 보여준다
        // task.isComplete = false
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render();
        console.log("진행중", filterList)
    }else if(mode === "done"){
        // 끝나는 케이스
        // task.isComplete = true
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render();
        console.log("끝남", filterList)
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}