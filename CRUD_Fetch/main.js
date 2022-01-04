var coursesAPI = "http://localhost:3000/courses";

function start() {
    getCourses(renderCourses);
    handleCreateForm();
}

start();

//functions
function getCourses(callback) {
    fetch(coursesAPI)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(coursesAPI, options)
        .then(function(response) {
            response.json()
        }).then(callback);
}

function deleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(coursesAPI + '/' + id, options)
        .then(function(response) {
            response.json()
        }).then(function() {
            var courseitem = document.querySelector('.course-item-' + id);
            if (courseitem) {
                courseitem.remove();
            }
        });
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector("#list-course");
    var htmls = courses.map(function(course) {
        return `
<li class="course-item-${course.id}">
<h4>${course.name}</h4>
<p>${course.description}</p>
<button onclick="deleteCourse(${course.id})">Xoa</button>
</li>`;
    });
    listCoursesBlock.innerHTML = htmls.join('');
}


function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var desc = document.querySelector('input[name="description"]').value;
        var formData = {
            name: name,
            description: desc
        };
        createCourse(formData, function() {
            getCourses(renderCourses);
        })
    }
}