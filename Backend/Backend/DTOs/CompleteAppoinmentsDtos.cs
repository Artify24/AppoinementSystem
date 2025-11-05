using Backend.DTOs;

namespace Backend.DTOs
{
    public class CompleteAppoinmentsDtos
    {
        public int? AppointmentId { get; set; }
        public bool IsConclude { get; set; }
        public PrescriptionsDtos Prescriptions { get; set; } = new PrescriptionsDtos();
        public List<MedicinDtos> Medicines { get; set; } = new List<MedicinDtos>();

    }
}
