import { jsPDF } from "jspdf"
import imgg from '../assets/images/logo1.png'


const printAdmissionForm = (studentDetails) => {

    const currYear = new Date().getFullYear()

    const [y, m, d] = studentDetails.dob.split('-');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const ddmmyyyy = d + '-' + m + '-' + y
    const dobWord = d + ' ' + months[m - 1] + ' ' + y
    var doc = new jsPDF();
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();


    doc.addImage(imgg, 'PNG', 20, 10, 17, 17);

    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.10 }));
    doc.addImage(imgg, 'PNG', pageWidth / 2 - 70, pageHeight / 2 - 70, 140, 140,);
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 1 }));


    doc.setFontSize(20);
    doc.setFont(undefined, 'bold').text('MILLENNIUM MODEL SCHOOL', pageWidth / 2, 18, { align: 'center' }).setFont(undefined, 'normal');

    doc.setFontSize(12);
    doc.text('Mandi Bamora, Dist. Sagar, (M.P.)', pageWidth / 2, 25, { align: 'center' });

    doc.line(5.5, 30, pageWidth - 5.5, 30);
    doc.line(5.5, 30.5, pageWidth - 5.5, 30.5);

    doc.setFontSize(15);
    doc.setFont(undefined, 'bolditalic').text('Admission Form', pageWidth / 2, 40, { align: 'center' }).setFont(undefined, 'normal');

    doc.setFontSize(12);
    doc.setFont(undefined, 'italic').text(`Session : ${currYear} - ${currYear + 1}`, pageWidth / 2, 48, { align: 'center' }).setFont(undefined, 'normal');
    doc.line(84, 42, pageWidth - 84, 42);
    doc.line(84, 42.5, pageWidth - 84, 42.5);

    doc.rect(155, 58, 28, 35);
    doc.text(`Photo`, 163, 77);


    doc.text(`Student's Name : ${studentDetails.studentName}`, 20, 65);
    doc.text(`Father's Name : ${studentDetails.fatherName}`, 20, 75);
    doc.text(`Mother's Name : ${studentDetails.motherName}`, 20, 85);

    doc.text(`Student's Date of Birth : ${ddmmyyyy} (${dobWord})`, 20, 95);
    doc.text(`Class : ${studentDetails.class}`, 20, 105);
    doc.text(`Gender : ${studentDetails.gender}`, 115, 105);

    doc.text(`Aadhar Number : ${studentDetails.aadhar}`, 20, 115);
    doc.text(`Samagra ID : ${studentDetails.samagraID}`, 115, 115);

    doc.text(`Category : ${studentDetails.category !== '' ? studentDetails.category : '--------'}`, 20, 125);
    doc.text(`Religion : ${studentDetails.religion !== '' ? studentDetails.religion : '--------'}`, 115, 125);

    doc.text(`Caste : ${studentDetails.caste !== '' ? studentDetails.caste : '--------'}`, 20, 135);
    doc.text(`Nationality : ${studentDetails.nationality !== '' ? studentDetails.nationality : '--------'}`, 115, 135);

    doc.text(`Phone no. : ${studentDetails.phone}`, 20, 145);
    doc.text(`Alternate phone no. : ${studentDetails.alternatePhone !== '' ? studentDetails.alternatePhone : '--------'}`, 115, 145);

    doc.text(`Permanent Address : ${studentDetails.permanentAddress}`, 20, 155, { maxWidth: 180 });
    doc.text(`Local Address : ${studentDetails.localAddress !== '' ? studentDetails.localAddress : '--------'}`, 20, 170, { maxWidth: 180 });


    doc.text(`Fathers's Occupation : ${studentDetails.fatherOccupation !== '' ? studentDetails.fatherOccupation : '--------'}`, 20, 185);
    doc.text(`Mother's Occupation : ${studentDetails.motherOccupation !== '' ? studentDetails.motherOccupation : '--------'}`, 20, 195);
    doc.text(`Fathers's Income (Rs.) : ${studentDetails.fatherIncome !== '' ? studentDetails.fatherIncome : '--------'}`, 20, 205);
    doc.text(`Mothers's Income (Rs.) : ${studentDetails.motherIncome !== '' ? studentDetails.motherIncome : '--------'}`, 115, 205);

    doc.text(`Mother Tounge : ${studentDetails.motherTounge !== '' ? studentDetails.motherTounge : '--------'}`, 20, 215);
    doc.text(`Any previous intitution : ${studentDetails.previousInstitution}`, 115, 215);

    if (studentDetails.previousInstitution === 'Yes') {
        doc.text(`Name of the previous institution : ${studentDetails.previousInstitutionName !== '' ? studentDetails.previousInstitutionName : '--------'}`, 20, 225, { maxWidth: 180 });
    }

    doc.setFontSize(13);
    doc.line(5.5, 235, pageWidth - 5.5, 235);
    doc.setFont(undefined, 'bold').text('Declaration', pageWidth / 2, 242, { align: 'center' }).setFont(undefined, 'normal');

    doc.setFontSize(11);
    doc.text(`I declare that all the above information is correct and true.`, 20, 248);
    doc.text(`Date :`, 20, 255);
    doc.text(`Signature of Guardian/Parent`, 145, 255);
    doc.text(`Place :`, 20, 262);
    doc.text(`Name :`, 145, 262);

    doc.line(5.5, 267, pageWidth - 5.5, 267);
    doc.setFontSize(13);
    doc.setFont(undefined, 'bold').text('For Office Use Only', pageWidth / 2, 274, { align: 'center' }).setFont(undefined, 'normal');

    doc.setFontSize(11);
    doc.text(`Name :`, 20, 281);
    doc.text(`Class :`, 20, 289);
    doc.text(`Admission No. & Date :`, 85, 289);
    doc.text(`Signature`, 185, 289);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
    doc.rect(5.5, 5.5, pageWidth - 11, pageHeight - 11);


    doc.addPage();

    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.10 }));
    doc.addImage(imgg, 'PNG', pageWidth / 2 - 70, pageHeight / 2 - 70, 140, 140,);
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 1 }));

    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);
    doc.rect(5.5, 5.5, pageWidth - 11, pageHeight - 11);
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold').text('Instructions', pageWidth / 2, 20, { align: 'center' }).setFont(undefined, 'normal');
    doc.line(88.5, 21.5, pageWidth - 88.5, 21.5);
    doc.setFontSize(12);
    doc.text(`\u2022 Parents are required to submit the registration form along with admission fee and following doucments to the admission counselor in the school -`, 20, 38, { maxWidth: 180 });
    doc.setFontSize(11);
    doc.text(`1. Passport Size Photo of the student`, 30, 50);
    doc.text(`2. Copy of Aadhar Card of the student`, 30, 57);
    doc.text(`3. Copy of Birth Certificate of the student`, 30, 64);
    doc.text(`4. Copy of Samagra ID`, 30, 71);
    doc.text(`5. Copy of bank passbook of any family member`, 30, 78);
    doc.text(`6. Transfer Certificate (T.C.) and copy of marksheet of  last year (if the student was in any previous institution)`, 30, 85, { maxWidth: 160 });
    doc.text(`\u2022 NOTE - Incomplete form will not be accepted.`, 20, 98, { maxWidth: 180 });
    doc.text(`\u2022 Student will be admitted only after verification by the admission counselor at the school.`, 20, 105, { maxWidth: 180 });


    doc.output('dataurlnewwindow');
}

export default printAdmissionForm