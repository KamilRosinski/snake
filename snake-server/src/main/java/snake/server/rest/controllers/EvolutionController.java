package snake.server.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import snake.server.logic.EvolutionService;
import snake.server.rest.dto.EvolutionDTO;

import java.util.List;

@RestController()
@RequestMapping("/api/evolution")
public class EvolutionController {

	private final EvolutionService evolutionService;

	@Autowired
	public EvolutionController(final EvolutionService evolutionService) {
		this.evolutionService = evolutionService;
	}

	@GetMapping("/all")
	public List<EvolutionDTO> getEvolutions() {
		return evolutionService.findAll();
	}

	@PostMapping
	public EvolutionDTO createEvolution() {
		return evolutionService.createEvolution();
	}

	@DeleteMapping("/{evolutionId}")
	public Long deleteEvolution(@PathVariable final Long evolutionId) {
		return evolutionService.deleteEvolution(evolutionId);
	}

}
