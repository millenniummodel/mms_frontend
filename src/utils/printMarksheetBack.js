import { jsPDF } from "jspdf"
import logo from '../assets/images/logo1.png'

const printMarksheetBack = () => {

    var doc = new jsPDF();

    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.12 }));
    doc.addImage(logo, 'PNG', pageWidth / 2 - 70, pageHeight / 2 - 70, 140, 140,);
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 1 }));
    var y = 30;
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16)
    doc.rect(8.5, 8.5, pageWidth - 17, pageHeight - 17)

    doc.setFontSize(15);
    doc.setFont(undefined, 'times')
    doc.setFont(undefined, 'bold').text('Grade System', pageWidth / 2, y, { align: 'center' })

    y = y + 7;

    doc.rect(15, y, pageWidth - 30, 60)
    doc.line(15, y + 10, pageWidth - 15, y + 10)
    doc.line(15, y + 20, pageWidth - 15, y + 20)
    doc.line(15, y + 30, pageWidth - 15, y + 30)
    doc.line(15, y + 40, pageWidth - 15, y + 40)
    doc.line(15, y + 50, pageWidth - 15, y + 50)

    var tt = pageWidth - 30
    doc.line(15 + tt / 3, y, 15 + tt / 3, y + 60)
    doc.line(15 + 2 * tt / 3, y, 15 + 2 * tt / 3, y + 60)

    doc.text("Grade", 15 + tt / 6, y + 6.5, { align: 'center' })
    doc.text("Percentage", 15 + tt / 2, y + 6.5, { align: 'center' })
    doc.text("Remarks", 15 + 5 * tt / 6, y + 6.5, { align: 'center' }).setFont(undefined, 'normal')

    y = y + 10
    doc.text("A", 15 + tt / 6, y + 6.5, { align: 'center' })
    doc.text("81% - 100%", 15 + tt / 2, y + 6.5, { align: 'center' })
    doc.text("Excellent", 15 + 5 * tt / 6, y + 6.5, { align: 'center' }).setFont(undefined, 'normal')

    y = y + 10
    doc.text("B", 15 + tt / 6, y + 6.5, { align: 'center' })
    doc.text("61% -80%", 15 + tt / 2, y + 6.5, { align: 'center' })
    doc.text("Very Good", 15 + 5 * tt / 6, y + 6.5, { align: 'center' }).setFont(undefined, 'normal')

    y = y + 10
    doc.text("C", 15 + tt / 6, y + 6.5, { align: 'center' })
    doc.text("46% - 60%", 15 + tt / 2, y + 6.5, { align: 'center' })
    doc.text("Good", 15 + 5 * tt / 6, y + 6.5, { align: 'center' }).setFont(undefined, 'normal')

    y = y + 10
    doc.text("D", 15 + tt / 6, y + 6.5, { align: 'center' })
    doc.text("33% - 45%", 15 + tt / 2, y + 6.5, { align: 'center' })
    doc.text("Work Hard", 15 + 5 * tt / 6, y + 6.5, { align: 'center' }).setFont(undefined, 'normal')

    y = y + 10
    doc.text("E", 15 + tt / 6, y + 6.5, { align: 'center' })
    doc.text("0% - 32%", 15 + tt / 2, y + 6.5, { align: 'center' })
    doc.text("Poor", 15 + 5 * tt / 6, y + 6.5, { align: 'center' }).setFont(undefined, 'normal')


    y = y + 50
    doc.text("If you want to build a nation, educate the children. If you want to make the nation", 15, y)
    doc.text("strong and integrated, educate the children. Any investment, any expenditure made", 15, y + 10)
    doc.text("on the education of the children is the investment on the nation. The children and", 15, y + 20)
    doc.text("the nation are safer and secure in the hands of right sort of teachers.", 15, y + 30)

    doc.setFont(undefined, 'bold').text("Education is the only panacea for all kinds of our evils.", pageWidth / 2, y + 50, { align: 'center' })

    doc.setFont(undefined, 'bold').text("* * * * *", pageWidth / 2, y + 65, { align: 'center' })

    doc.output('dataurlnewwindow');
    doc.save('out.pdf')
};

export default printMarksheetBack