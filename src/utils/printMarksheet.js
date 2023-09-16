import { jsPDF } from "jspdf"
import logo from '../assets/images/logo1.png'


const dateWord = (dt) => {
    const [d, m, y] = dt.split('-');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const dobWord = d + ' ' + months[m - 1] + ' ' + y
    return dobWord
}

const marksToGrade = (marks) => {
    if (marks > 80) return "A";
    if (marks > 60) return "B";
    if (marks > 45) return "C";
    if (marks >= 33) return "D";
    if(marks>=0) return "E"
    return "-";

}

const nextClass = (cls) => {
    const classIndexes = { "Nursery": 0, "LKG": 1, "UKG": 2, "1st": 3, "2nd": 4, "3rd": 5, "4th": 6, "5th": 7, "6th": 8, "7th": 9, "8th": 10, "9th": 11, "10th": 12, "11th": 13, "12th": 14 }
    const classes = ["Nursery", "LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", ""]
    return classes[classIndexes[cls] + 1]
}


const printMarksheet = ([studentsData, acadYear]) => {
    var doc = new jsPDF();
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    const remarks = { "A": "Excellent", "B": "Very Good", "C": "Good", "D": "Work hard", "E": "Poor" }

    studentsData.map(student => {
        const values = student.values
        const halfYearly = student.halfYearlyObt
        const annual = student.annualObt
        const subjects = student.subjects
        const halfMax = student.halfYearlyMax
        const annualMax = student.annualMax

        const stDetails = student.studentDetails

        const finalResult = [
            Math.ceil(((halfYearly[0] / halfMax) + (annual[0] / annualMax)) * 50),
            Math.ceil(((halfYearly[1] / halfMax) + (annual[1] / annualMax)) * 50),
            Math.ceil(((halfYearly[2] / halfMax) + (annual[2] / annualMax)) * 50),
            Math.ceil(((halfYearly[3] / halfMax) + (annual[3] / annualMax)) * 50),
            Math.ceil(((halfYearly[4] / halfMax) + (annual[4] / annualMax)) * 50),
            Math.ceil(((halfYearly[5] / halfMax) + (annual[5] / annualMax)) * 50)
        ]

        const summ = finalResult.reduce((a, b) => a + b, 0)
        const percentage = Math.round((summ / 6) * 100) / 100
        const finalGrade = marksToGrade(percentage)


        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 0.12 }));
        doc.addImage(logo, 'PNG', pageWidth / 2 - 70, pageHeight / 2 - 70, 140, 140,);
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 1 }));
        var y = 25;
        doc.rect(8, 8, pageWidth - 16, pageHeight - 16)
        doc.rect(8.5, 8.5, pageWidth - 17, pageHeight - 17)
        doc.setFontSize(25);

        doc.setFont(undefined, 'times').text('MILLENNIUM  MODEL  SCHOOL', pageWidth / 2, y, { align: 'center' })
        y = y + 7;
        doc.setFontSize(15);

        doc.text('Mandi Bamora Dist. Sagar, Madhya Pradesh', pageWidth / 2, y, { align: 'center' });

        y = y + 18

        doc.setFontSize(14);
        doc.setFont(undefined, 'bold')
        doc.rect(70, y - 6, pageWidth - 140, 9)
        doc.rect(70.3, y - 5.7, pageWidth - 140.6, 8.4)
        doc.text(`REPORT CARD   ${acadYear}`, pageWidth / 2, y, { align: 'center' });


        doc.setFontSize(15);
        doc.setFont(undefined, 'normal')
        y = y + 20
        doc.text(`Student's Name : `, 15, y).setFont(undefined, 'bold').setFontSize(14)
        doc.text(`${stDetails.name}`, 52, y).setFont(undefined, 'normal')

        doc.text(`Class       :          `, 130, y).setFont(undefined, 'bold').setFontSize(14)
        doc.text(`${student.cls}`, 162, y).setFont(undefined, 'normal')

        y = y + 10
        doc.setFontSize(15);


        doc.setFontSize(15);
        doc.text("Date of birth : ", 15, y).setFont(undefined, 'bold').setFontSize(14)
        doc.text(`${stDetails.dob} (${dateWord(stDetails.dob)})`, 47, y).setFont(undefined, 'normal')

        doc.text("Scholar No.  :  ", 130, y).setFont(undefined, 'bold').setFontSize(14)
        doc.text(`${student.admNo}`, 162, y,).setFont(undefined, 'normal')

        y = y + 10
        doc.setFontSize(15);
        doc.text("Father's Name  : ", 15, y).setFont(undefined, 'bold').setFontSize(14)
        doc.text(`${stDetails.fName}`, 52, y,).setFont(undefined, 'normal')


        doc.text("SSSM ID    :      ", 130, y).setFont(undefined, 'bold').setFontSize(14)
        doc.text(`${stDetails.sssm}`, 162, y,).setFont(undefined, 'normal')

        y = y + 10
        doc.setFontSize(15);
        doc.text("Mother's Name : ", 15, y).setFont(undefined, 'bold').setFontSize(14)
        doc.text(`${stDetails.mName}`, 52, y,).setFont(undefined, 'normal')

        doc.text("Aadhar No.  :  ", 130, y).setFont(undefined, 'bold').setFontSize(14)
        doc.text(`${stDetails.aadhar}`, 162, y)

        y = y + 22
        doc.text('Valuation of Educational Fields', pageWidth / 2, y, { align: 'center' });

        doc.rect(15, y + 5, pageWidth - 30, 57)

        doc.line(50, y + 5, 50, y + 62)
        var tt = pageWidth - 15 - 50
        doc.line(50 + tt / 3, y + 5, 50 + tt / 3, y + 62)
        doc.line(50 + 2 * tt / 3, y + 5, 50 + 2 * tt / 3, y + 62)

        doc.line(50, y + 13, pageWidth - 15, y + 13)
        doc.line(15, y + 20, pageWidth - 15, y + 20)
        doc.line(50 + tt / 9, y + 13, 50 + tt / 9, y + 62)
        doc.line(50 + 2 * tt / 9, y + 13, 50 + 2 * tt / 9, y + 62)
        doc.line(50 + 4 * tt / 9, y + 13, 50 + 4 * tt / 9, y + 62)
        doc.line(50 + 5 * tt / 9, y + 13, 50 + 5 * tt / 9, y + 62)
        doc.line(50 + 7 * tt / 9, y + 13, 50 + 7 * tt / 9, y + 62)
        doc.line(50 + 8 * tt / 9, y + 13, 50 + 8 * tt / 9, y + 62)

        doc.line(15, y + 27, pageWidth - 15, y + 27)
        doc.line(15, y + 34, pageWidth - 15, y + 34)
        doc.line(15, y + 41, pageWidth - 15, y + 41)
        doc.line(15, y + 48, pageWidth - 15, y + 48)
        doc.line(15, y + 55, pageWidth - 15, y + 55)

        doc.setFontSize(13)
        doc.text("Subjects", 24, y + 14)


        doc.text("    Half Yearly Exam                Annual Exam                   Final Result", 51, y + 10).setFont(undefined, 'italic')

        doc.text(`${subjects[0]}`, 33, y + 25, { align: 'center' })
        doc.text(`${subjects[1]}`, 33, y + 32, { align: 'center' })
        doc.text(`${subjects[2]}`, 33, y + 39, { align: 'center' })
        doc.text(`${subjects[3]}`, 33, y + 46, { align: 'center' })
        doc.text(`${subjects[4]}`, 33, y + 53, { align: 'center' })
        doc.text(`${subjects[5]}`, 33, y + 60, { align: 'center' })

        doc.text("Max.      Obt.     Grade     Max.       Obt.     Grade     Max.       Obt.     Grade", 54, y + 18).setFont(undefined, 'normal')

        var rr = 58
        doc.text(`${halfMax}`, rr, y + 25, { align: 'center' })
        doc.text(`${halfMax}`, rr, y + 32, { align: 'center' })
        doc.text(`${halfMax}`, rr, y + 39, { align: 'center' })
        doc.text(`${halfMax}`, rr, y + 46, { align: 'center' })
        doc.text(`${halfMax}`, rr, y + 53, { align: 'center' })
        doc.text(`${halfMax}`, rr, y + 60, { align: 'center' })

        rr = rr + 16
        doc.text(`${halfYearly[0]}`, rr, y + 25, { align: 'center' })
        doc.text(`${halfYearly[1]}`, rr, y + 32, { align: 'center' })
        doc.text(`${halfYearly[2]}`, rr, y + 39, { align: 'center' })
        doc.text(`${halfYearly[3]}`, rr, y + 46, { align: 'center' })
        doc.text(`${halfYearly[4]}`, rr, y + 53, { align: 'center' })
        doc.text(`${halfYearly[5]}`, rr, y + 60, { align: 'center' })

        rr = rr + 16
        doc.text(`${marksToGrade(halfYearly[0]*100/halfMax)}`, rr, y + 25, { align: 'center' })
        doc.text(`${marksToGrade(halfYearly[1]*100/halfMax)}`, rr, y + 32, { align: 'center' })
        doc.text(`${marksToGrade(halfYearly[2]*100/halfMax)}`, rr, y + 39, { align: 'center' })
        doc.text(`${marksToGrade(halfYearly[3]*100/halfMax)}`, rr, y + 46, { align: 'center' })
        doc.text(`${marksToGrade(halfYearly[4]*100/halfMax)}`, rr, y + 53, { align: 'center' })
        doc.text(`${marksToGrade(halfYearly[5]*100/halfMax)}`, rr, y + 60, { align: 'center' })

        rr = rr + 16
        doc.text(`${annualMax}`, rr, y + 25, { align: 'center' })
        doc.text(`${annualMax}`, rr, y + 32, { align: 'center' })
        doc.text(`${annualMax}`, rr, y + 39, { align: 'center' })
        doc.text(`${annualMax}`, rr, y + 46, { align: 'center' })
        doc.text(`${annualMax}`, rr, y + 53, { align: 'center' })
        doc.text(`${annualMax}`, rr, y + 60, { align: 'center' })

        rr = rr + 16
        doc.text(`${annual[0]}`, rr, y + 25, { align: 'center' })
        doc.text(`${annual[1]}`, rr, y + 32, { align: 'center' })
        doc.text(`${annual[2]}`, rr, y + 39, { align: 'center' })
        doc.text(`${annual[3]}`, rr, y + 46, { align: 'center' })
        doc.text(`${annual[4]}`, rr, y + 53, { align: 'center' })
        doc.text(`${annual[5]}`, rr, y + 60, { align: 'center' })

        rr = rr + 16
        doc.text(`${marksToGrade(annual[0]*100/annualMax)}`, rr, y + 25, { align: 'center' })
        doc.text(`${marksToGrade(annual[1]*100/annualMax)}`, rr, y + 32, { align: 'center' })
        doc.text(`${marksToGrade(annual[2]*100/annualMax)}`, rr, y + 39, { align: 'center' })
        doc.text(`${marksToGrade(annual[3]*100/annualMax)}`, rr, y + 46, { align: 'center' })
        doc.text(`${marksToGrade(annual[4]*100/annualMax)}`, rr, y + 53, { align: 'center' })
        doc.text(`${marksToGrade(annual[5]*100/annualMax)}`, rr, y + 60, { align: 'center' })

        rr = rr + 17
        doc.text(`${100}`, rr, y + 25, { align: 'center' })
        doc.text(`${100}`, rr, y + 32, { align: 'center' })
        doc.text(`${100}`, rr, y + 39, { align: 'center' })
        doc.text(`${100}`, rr, y + 46, { align: 'center' })
        doc.text(`${100}`, rr, y + 53, { align: 'center' })
        doc.text(`${100}`, rr, y + 60, { align: 'center' })

        rr = rr + 16
        doc.text(`${finalResult[0]}`, rr, y + 25, { align: 'center' })
        doc.text(`${finalResult[1]}`, rr, y + 32, { align: 'center' })
        doc.text(`${finalResult[2]}`, rr, y + 39, { align: 'center' })
        doc.text(`${finalResult[3]}`, rr, y + 46, { align: 'center' })
        doc.text(`${finalResult[4]}`, rr, y + 53, { align: 'center' })
        doc.text(`${finalResult[5]}`, rr, y + 60, { align: 'center' })

        rr = rr + 16
        doc.text(`${marksToGrade(finalResult[0])}`, rr, y + 25, { align: 'center' })
        doc.text(`${marksToGrade(finalResult[1])}`, rr, y + 32, { align: 'center' })
        doc.text(`${marksToGrade(finalResult[2])}`, rr, y + 39, { align: 'center' })
        doc.text(`${marksToGrade(finalResult[3])}`, rr, y + 46, { align: 'center' })
        doc.text(`${marksToGrade(finalResult[4])}`, rr, y + 53, { align: 'center' })
        doc.text(`${marksToGrade(finalResult[5])}`, rr, y + 60, { align: 'center' })


        y = y + 74
        doc.setFont(undefined, 'bold')
        doc.setFontSize(14)
        doc.text('Social and Personal Values', 53, y + 2, { align: 'center' }).setFontSize(13);
        doc.rect(15, y + 5, 75, 50)
        doc.line(15, y + 13, 90, y + 13)
        doc.line(15, y + 20, 90, y + 20)
        doc.line(15, y + 27, 90, y + 27)
        doc.line(15, y + 34, 90, y + 34)
        doc.line(15, y + 41, 90, y + 41)
        doc.line(15, y + 48, 90, y + 48)
        doc.line(65, y + 5, 65, y + 55)

        doc.text("Values                     Grade", 34, y + 10).setFont(undefined, 'italic')

        doc.text(`${'Discipline'}`, 42, y + 18, { align: 'center' })
        doc.text(`${'Kindness'}`, 42, y + 25, { align: 'center' })
        doc.text(`${'Punctuality'}`, 42, y + 32, { align: 'center' })
        doc.text(`${'Honesty'}`, 42, y + 39, { align: 'center' })
        doc.text(`${'Regularity'}`, 42, y + 46, { align: 'center' })
        doc.text(`${'Cleanliness'}`, 42, y + 53, { align: 'center' })

        doc.setFont(undefined, 'normal')
        doc.text(`${values[0]}`, 78, y + 18, { align: 'center' })
        doc.text(`${values[1]}`, 78, y + 25, { align: 'center' })
        doc.text(`${values[2]}`, 78, y + 32, { align: 'center' })
        doc.text(`${values[3]}`, 78, y + 39, { align: 'center' })
        doc.text(`${values[4]}`, 78, y + 46, { align: 'center' })
        doc.text(`${values[5]}`, 78, y + 53, { align: 'center' }).setFontSize(14);


        doc.setFont(undefined, 'bold').text(`Annual Result`, 135, y + 2).setFont(undefined, 'normal').setFontSize(13);
        doc.rect(105, y + 5, 90, 50)

        doc.line(105, y + 14, 195, y + 14)
        doc.line(105, y + 22, 195, y + 22)
        doc.line(105, y + 30, 195, y + 30)
        doc.line(105, y + 38, 195, y + 38)
        doc.line(105, y + 46, 195, y + 46)
        doc.line(150, y + 5, 150, y + 46)

        doc.text(`Percentage`, 127, y + 11, { align: 'center' })
        doc.text(`Grade`, 127, y + 19, { align: 'center' })
        doc.text(`Result`, 127, y + 27, { align: 'center' })
        doc.text(`Teacher's Remark`, 127, y + 35, { align: 'center' })
        doc.text(`Student's Attendence`, 127, y + 43, { align: 'center' })

        doc.text(`${percentage}%`, 172, y + 11, { align: 'center' })
        doc.text(`${finalGrade}`, 172, y + 19, { align: 'center' })
        doc.text(`${finalGrade === 'E' ? 'Failed' : 'Passed'}`, 172, y + 27, { align: 'center' })
        doc.text(`${remarks[finalGrade]}`, 172, y + 35, { align: 'center' })
        doc.text(`${student.attendence} out of ${250} days`, 172, y + 43, { align: 'center' })


        doc.setFontSize(14)
        if (finalGrade === 'E') doc.text(`The student is retianed in class ${student.cls}`, 150, y + 52, { align: 'center' })
        else doc.text(`The student is promoted to class ${nextClass(student.cls)}`, 150, y + 52, { align: 'center' }).setFontSize(14)



        y = y + 83

        doc.setFont(undefined, 'bold').setFontSize(15).text(`Class Teacher`, 70, y + 3)
        doc.text(`Headmaster / Principal`, 142, y + 3)


        doc.addPage()
        return 1
    })




    var pageCount = doc.internal.getNumberOfPages();
    if(pageCount) doc.deletePage(pageCount)
    
    if(pageCount-1){
        doc.output('dataurlnewwindow');
    }
    else alert("No student exist!")
};

export default printMarksheet