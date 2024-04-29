class Validator {
    static validateTask(taskInfo) {
        if (taskInfo.hasOwnProperty('title') && taskInfo.hasOwnProperty('description') && taskInfo.hasOwnProperty('completed') )  {
            return {
                "status": true,
                "message": "Validation Successfully"
            }
        }
        else {
            return {
                "status": false,
                "message": "Please Fill All the fields"
            }
        }
    }
}
module.exports = Validator;