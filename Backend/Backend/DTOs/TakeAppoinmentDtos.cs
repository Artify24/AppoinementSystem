namespace Backend.DTOs
{
    public class TakeAppoinmentDtos
    {
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public string Symptoms { get; set; }
        public DateTime AppointmentDate { get; set; }
    }
}
