using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Diagnostics;

namespace WebApplication3
{

    public class GridDecorator
    {
        
    }



    public partial class _Default : System.Web.UI.Page
    {

        public static void MergeRows(GridView gridView,int columnIndex,int secondaryColumn)
        {
            // starting at the bottom of the column, count back up.
            for (int rowIndex = gridView.Rows.Count - 2; rowIndex >= 0; rowIndex--)
            {
                GridViewRow row = gridView.Rows[rowIndex];
                GridViewRow previousRow = gridView.Rows[rowIndex + 1];

                //if the cell is empty, do no merging and go to the next cell up.
                if (row.Cells[columnIndex].Text != "&nbsp;")
                {
                    //if the current and previous cell match, merge them.
                    if (row.Cells[columnIndex].Text == previousRow.Cells[columnIndex].Text)
                    {
                        //this bit merges the cells of specified column

                        if (previousRow.Cells[columnIndex].RowSpan < 2)
                        {
                            row.Cells[columnIndex].RowSpan = 2;
                        }
                        else
                        {
                            row.Cells[columnIndex].RowSpan = previousRow.Cells[columnIndex].RowSpan + 1;
                        }
                        previousRow.Cells[columnIndex].Visible = false;

                        //this bit merges the secondary column
                        row.Cells[secondaryColumn].RowSpan = previousRow.Cells[secondaryColumn].RowSpan < 2 ? 2 :
                                                                                                              previousRow.Cells[secondaryColumn].RowSpan + 1;
                        previousRow.Cells[secondaryColumn].Visible = false;

                    }
                }
                
            }
            for (int rowIndex = gridView.Rows.Count - 2; rowIndex >= 0; rowIndex--)
            {
                GridViewRow row = gridView.Rows[rowIndex];
                GridViewRow previousRow = gridView.Rows[rowIndex + 1];

                if (row.Cells[columnIndex].Text != "&nbsp;")
                {
                    if (row.Cells[columnIndex].Text != previousRow.Cells[columnIndex].Text)
                    {
    
                        //InsertInvestigationRow(gridView, rowIndex+2);

                    }
                }
            }
        }

        protected static void InsertInvestigationRow(GridView gridview, int rowIndex)
        {
            GridViewRow row = new GridViewRow(-1,-1,DataControlRowType.DataRow, DataControlRowState.Normal);
            row.Cells.AddRange(CreateCells());
            Table tbl = gridview.Rows[0].Parent as Table;
            tbl.Rows.AddAt(rowIndex, row);

        }

        static TableCell[] CreateCells()
        {

            TableCell[] cells = new TableCell[1];
            TableCell cell;
            Label lbl;

            //The order item column
            cell = new TableCell();
            lbl = new Label();
            lbl.Text = "Test";
            cell.Controls.Add(lbl);
            cells[0] = cell;

            //The price column
            cell = new TableCell();
            lbl = new Label();
            lbl.Font.Bold = true;
            //lbl.Text = tax.ToString("C");
            cell.HorizontalAlign = HorizontalAlign.Right;
            cell.Controls.Add(lbl);
            cells[1] = cell;

            return cells;
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            string v = Request.QueryString["startdate"];
            if (v == null)
            {
                // Get 5PM on the last weekday
                DateTime StartDate;
                switch (DateTime.Today.DayOfWeek) {
                    case DayOfWeek.Monday:
                        StartDate = DateTime.Now.Date.AddHours(-72 + 17);
                        break;
                    case DayOfWeek.Sunday:
                        StartDate = DateTime.Now.Date.AddHours(-48 + 17);
                        break;
                    default:
                        StartDate = DateTime.Now.Date.AddHours(-24 + 17);
                        break;
                }

                Response.Redirect("/?startdate=" + StartDate.ToString());
             
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            // storage for the entries we're going to annotate
            List<int> entries = new List<int>();

            // Enumerate the GridViewRows
            foreach (GridViewRow row in GridView1.Rows)
            {
                // Programmatically access the CheckBox from the TemplateField
                var cb = row.FindControl("chkSelected") as CheckBox;

           

                // If it's checked, get the keys we need to perform the investigation text query.
                if (cb.Checked)
                {
                     var entryID = GridView1.DataKeys[row.RowIndex].Values["EntryID"] ;
                     var investigationID = GridView1.DataKeys[row.RowIndex].Values["investigationID"];
                }
            }




        }

        protected void RenderInvestigations(GridView gridView)
        {

        }

        protected void GridView1_PreRender1(object sender, EventArgs e)
        {
            //MergeRows(GridView1,8,0);
            //RenderInvestigations(GridView1);
        }




    }
}