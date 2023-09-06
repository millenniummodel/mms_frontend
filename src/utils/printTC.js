import { jsPDF } from "jspdf"
import logo from '../assets/images/logo1.png'


const dateWord=(dt)=>{
    const [d, m, y] = dt.split('-');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const dobWord = d + ' ' + months[m - 1] + ' ' + y
    return dobWord
}

const printTC = (studentsData) => {
    var doc = new jsPDF();
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    studentsData.map((student) => {
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 0.05 }));
        doc.addImage(logo, 'PNG', pageWidth / 2 - 70, pageHeight / 2 - 70, 140, 140,);
        doc.saveGraphicsState();
        doc.setGState(new doc.GState({ opacity: 1 }));
        var y = 30;
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20)
        doc.rect(10.5, 10.5, pageWidth - 21, pageHeight - 21)
        doc.setFontSize(25);

        doc.setFont(undefined, 'times').text('MILLENNIUM MODEL SCHOOL', pageWidth / 2, y, { align: 'center' })
        y = y + 5;
        doc.addImage(logo, 'PNG', pageWidth / 2 - 15, y, 30, 30,);
        y = y + 35
        doc.setFontSize(12);
        doc.text('Khajrod Road,Mandi Bamora', pageWidth / 2, y, { align: 'center' });
        y = y + 7
        doc.text('Dist. Sagar, Madhya Pradesh - 464240', pageWidth / 2, y, { align: 'center' });
        y = y + 7
        doc.setFont(undefined, 'bold')
        doc.text('DISE Code : 23110414101', pageWidth / 2, y, { align: 'center' });
        y = y + 7
        doc.text('Email : millenniummodel2000@gmail.com', pageWidth / 2, y, { align: 'center' });
        y = y + 7
        doc.text('Ph. No.  : +91-9926336071 , +91-8982352628', pageWidth / 2, y, { align: 'center' });
        y = y + 20

        doc.setFontSize(14);
        doc.setFont(undefined, 'bolditalic')
        doc.rect(70, y - 6, pageWidth - 140, 9)
        doc.rect(70.3, y - 5.7, pageWidth - 140.6, 8.4)
        doc.text('Transfer Certificate', pageWidth / 2, y, { align: 'center' });


        y = y + 25

        doc.setFontSize(12);
        doc.setFont(undefined, 'normal')

        doc.text(`Certificate Number : ${student.tcDetails.certificateNo}`, 145, y)

        doc.setFontSize(15);
        y = y + 20
        doc.text("This is to certify that", 20, y).setFont(undefined, 'bolditalic').setFontSize(14)
        doc.text(`${student.name}`, 105, y, { align: 'center' }).setFont(undefined, 'normal')
        doc.setLineDash([0.7, 0.7], 0);
        doc.line(67, y + 1, pageWidth - 22, y + 1);


        y = y + 10
        doc.setFontSize(15);
        doc.text("Son/Daughter of ", 20, y).setFont(undefined, 'bolditalic').setFontSize(14)
        doc.text(`${student.fName}`, 105, y, { align: 'center' }).setFont(undefined, 'normal')
        doc.line(58, y + 1, pageWidth - 22, y + 1);


        doc.setLineDash([0.7, 0.7], 0);


        y = y + 10
        doc.setFontSize(15);
        doc.text("was admitted to the school in class ", 20, y).setFont(undefined, 'bolditalic').setFontSize(14)
        doc.text(`${student.admClass}`, 108, y, { align: 'center' }).setFont(undefined, 'normal')
        doc.line(95, y + 1, pageWidth - 89, y + 1);


        doc.setFontSize(15);
        doc.text("on ", 123, y).setFont(undefined, 'bolditalic').setFontSize(14)
        doc.text(`${student.doa}`, 149, y, { align: 'center' }).setFont(undefined, 'normal')
        doc.line(132, y + 1, pageWidth - 45, y + 1);

        doc.setFontSize(15);
        doc.text("under", 168, y)

        y = y + 10
        doc.setFontSize(15);
        doc.text("admission no. ", 20, y).setFont(undefined, 'bolditalic').setFontSize(14)
        doc.text(`${student.admNo}`, 64, y, { align: 'center' }).setFont(undefined, 'normal')
        doc.line(53, y + 1, pageWidth - 133, y + 1);

        doc.setFontSize(15);
        doc.text("and left school on ", 80, y).setFont(undefined, 'bolditalic').setFontSize(14)
        doc.text(`${student.tcDetails.dol}`, 137, y, { align: 'center' }).setFont(undefined, 'normal')
        doc.line(121, y + 1, pageWidth - 52, y + 1);

        doc.setFontSize(15);
        doc.text(". His/Her date", 160, y)


        y = y + 10
        doc.setFontSize(15);
        doc.text("of birth according to the admission register is", 20, y).setFont(undefined, 'bolditalic').setFontSize(14)
        doc.text(`${student.dob} (${dateWord(student.dob)})`, 154, y, { align: 'center' }).setFont(undefined, 'normal')
        doc.line(118, y + 1, pageWidth - 21, y + 1);

        y = y + 10
        doc.setFontSize(15);
        doc.text("Class in which the student last studied : ", 20, y).setFont(undefined, 'bolditalic').setFontSize(14)
        doc.text(`${student.class}`, 120, y, { align: 'center' }).setFont(undefined, 'normal')
        doc.line(108, y + 1, pageWidth - 77, y + 1);


        y = y + 10
        doc.setFontSize(15);
        doc.text("Whether student promoted to higher class or retained in same class : ", 20, y).setFont(undefined, 'bolditalic').setFontSize(14)
        doc.text(`${student.tcDetails.passed==='Yes'?'Promoted':'Retained'}`, 180, y, { align: 'center' }).setFont(undefined, 'normal')
        doc.line(167, y + 1, pageWidth - 15, y + 1);

        y = y + 10
        doc.setFontSize(15);
        doc.text("All dues in his/her name have been paid.", 20, y)

        y = y + 10
        doc.text("He/She bears a                        character. ", 20, y).setFont(undefined, 'bolditalic').setFontSize(14)
        doc.text("Good", 67, y, { align: 'center' }).setFont(undefined, 'bold').setFontSize(16)
        doc.line(55, y + 1, pageWidth - 129, y + 1);

        y = y + 30
        doc.text("Headmaster / Principal", pageWidth - 70, y).setFontSize(14)
        doc.text("Date : ", 20, y).setFont(undefined, 'normal')
        doc.text(`${student.tcDetails.issueDate}`, 35, y)

        doc.addPage()
        return 1
    })

    var pageCount = doc.internal.getNumberOfPages();
    doc.deletePage(pageCount)

    if(pageCount-1){
        doc.output('dataurlnewwindow');
    }
    else alert("No student exist!")
};

export default printTC