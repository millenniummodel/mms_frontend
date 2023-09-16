import { jsPDF } from "jspdf"
import imgg from '../assets/images/admitt.png'
import logo from '../assets/images/logo1.png'


const printAdmitCard = ([examDetails, students]) => {

    

        var doc = new jsPDF('l', 'mm', [297, 210]);

        const xP = [5, 5, 5, 152, 152, 152]
        const yP = [10, 77, 145, 10, 77, 145]

        const exam =examDetails["examName"]


        students.map((student, idx) => {

            var x = xP[idx % 6]
            var y = yP[idx % 6]

            doc.addImage(imgg, 'PNG', x + 60, y + 44, 22, 11);
            doc.addImage(logo, 'PNG', x + 10, y + 1.5, 12, 12);

            doc.rect(x, y, 140, 60);
            doc.line(x, y + 15, x + 140, y + 15)
            doc.line(x + 85, y + 15, x + 85, y + 60)

            doc.setFontSize(14);
            doc.setFont(undefined, 'bold').text('Millennium Model School Mandi Bamora', x + 30, y + 6).setFont(undefined, 'normal');

            doc.setFontSize(11);
            doc.setFont(undefined, 'italic').text(`Admit Card - ${exam}`, x + 38, y + 12).setFont(undefined, 'normal');

            doc.setFontSize(11);
            doc.text(`Name     :  ${student.name}`, x + 7, y + 24)
            doc.text(`Class     :  ${student.class}`, x + 7, y + 32)
            doc.text(`Roll No. :  ${student.rollNo}`, x + 7, y + 40)
            doc.text(`Adm. No. :  ${student.admNo}`, x + 7, y + 48)


            doc.line(x + 85, y + 24, x + 140, y + 24);
            doc.line(x + 85, y + 30, x + 140, y + 30);
            doc.line(x + 85, y + 36, x + 140, y + 36);
            doc.line(x + 85, y + 42, x + 140, y + 42);
            doc.line(x + 85, y + 48, x + 140, y + 48);
            doc.line(x + 85, y + 54, x + 140, y + 54);

            doc.line(x + 108, y + 24, x + 108, y + 60);

            doc.text(`Time - ${examDetails["time"]}`, x+87, y + 20)
            doc.text(`${examDetails["date"][0]}`, x+87, y + 28)
            doc.text(`${examDetails["subjects"][0]}`, x + 124, y + 28, { align: 'center' })

            doc.text(`${examDetails["date"][1]}`, x+87, y + 34)
            doc.text(`${examDetails["subjects"][1]}`, x + 124, y + 34, { align: 'center' })

            doc.text(`${examDetails["date"][2]}`, x+87, y + 40)
            doc.text(`${examDetails["subjects"][2]}`, x + 124, y + 40, { align: 'center' })

            doc.text(`${examDetails["date"][3]}`, x+87, y + 46)
            doc.text(`${examDetails["subjects"][3]}`, x + 124, y + 46, { align: 'center' })

            doc.text(`${examDetails["date"][4]}`, x+87, y + 52)
            doc.text(`${examDetails["subjects"][4]}`, x + 124, y + 52, { align: 'center' })

            doc.text(`${examDetails["date"][5]}`, x+87, y + 58)
            doc.text(`${examDetails["subjects"][5]}`, x + 124, y + 58, { align: 'center' })

            doc.setFontSize(10);
            doc.setFont(undefined, 'bold').text('Headmaster', x + 60, y + 57).setFont(undefined, 'normal');

            if (idx % 6 === 5) doc.addPage();

            return 1
        })

        doc.save(`Admit Card - ${exam} Class - ${examDetails.cls}`)

}

export default printAdmitCard