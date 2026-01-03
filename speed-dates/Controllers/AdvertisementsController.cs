using Microsoft.AspNetCore.Mvc;
using speed_dates.Entities;
using speed_dates.Interfaces;
using speed_dates.Models;

namespace speed_dates.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdvertisementsController : ControllerBase
{
    private readonly IAdvertisementRepository _advertisementRepository;
    private readonly IConfirmationService _confirmationService;

    public AdvertisementsController(IAdvertisementRepository advertisementRepository, IConfirmationService confirmationService)
    {
        _advertisementRepository = advertisementRepository;
        _confirmationService = confirmationService;
    }

    [HttpGet()]
    public async Task<AdvertisementsResponse<Advertisement>> GetAdvertisements([FromQuery] Category category, [FromQuery] int page = 0)
    {
        var advertisements = await _advertisementRepository.GetAdvertisements(page, category);

        return advertisements;
    }

    [HttpPost()]
    public async Task<Advertisement> AddAdvertisement([FromBody] Advertisement advertisement)
    {
        advertisement.Confirmed = false;
        var entity = await _advertisementRepository.CreateAdvertisement(advertisement);

        var isConfirmed = await _confirmationService.SendConfirmationAsync(advertisement.Email, entity.Id, advertisement.ConfirmationCode);
        if (isConfirmed)
        {
            advertisement.Confirmed = true;
            await _advertisementRepository.ConfirmAdvertisementAsync(advertisement.Id);
        }
        // Return fake uuid and code for testing purposes
        entity.Id = new Guid();
        entity.ConfirmationCode = "a1b2c3";

        return entity;
    }

    [HttpGet("confirm/{id}")]
    public async Task<IActionResult> ConfirmAdvertisement(Guid id)
    {
        var advertisement = await _advertisementRepository.ConfirmAdvertisementAsync(id);
        if (advertisement == null)
        {
            return NotFound();
        }

        if (advertisement.Confirmed)
        {
            await _confirmationService.ConfirmEmailAsync(advertisement.Email);
            return Ok(new { success = true, message = "Advertisement confirmed." });
        }

        return BadRequest("Confirmation failed.");
    }


    [HttpPost("confirm-by-code/{id}")]
    public async Task<IActionResult> ConfirmAdvertisementByCode(string id)
    {
        var advertisement = await _advertisementRepository.ConfirmAdvertisementAsync(id);
        if (advertisement == null)
        {
            return NotFound();
        }
        if (advertisement.Confirmed)
        {
            await _confirmationService.ConfirmEmailAsync(advertisement.Email);
            return Ok(new { success = true, message = "Advertisement confirmed." });
        }

        return BadRequest("Confirmation failed.");
    }

    [HttpPost("send-message")]
    public async Task<IActionResult> SendMessage([FromBody] AdvertisementsMessageRequest request)
    {
        var content = request.Content;
        var advertisementId = request.AdvertisementId;
        var senderEmail = request.SenderEmail;

        var advertisement = await _advertisementRepository.ConfirmAdvertisementAsync(advertisementId);
        if (advertisement == null)
        {
            return NotFound();
        }

        if (advertisement.Confirmed)
        {
            var isSent = await _confirmationService.SendMessageAsync(advertisement, senderEmail, content);
            return Ok(new { success = true, sent = isSent, message = isSent ? "Message sent and confirmed." : "Message registered but not confirmed." });
        }

        return BadRequest("Confirmation failed.");
    }

    [HttpGet("confirm-message/{id}")]
    public async Task<IActionResult> ConfirmMessage(string id)
    {

        var isConfirmed = await _confirmationService.ConfirmMessageAsync(id);
        if (isConfirmed)
        {
            return Ok(new { success = true, message = "Message confirmed." });
        }

        return BadRequest("Confirmation failed.");
    }
}